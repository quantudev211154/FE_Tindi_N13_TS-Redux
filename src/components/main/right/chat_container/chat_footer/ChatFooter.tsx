import { AttachFile, ImageOutlined, Mood, Send } from '@mui/icons-material'
import { Button, TextareaAutosize, Tooltip } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { authState } from '../../../../../redux/slices/AuthSlice'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import { saveMessage } from '../../../../../redux/thunks/MessageThunks'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../../../redux/types/ConversationTypes'
import {
  AttachFileTypeEnum,
  MessageStatusEnum,
  MessageType,
  MessageTypeEnum,
} from '../../../../../redux/types/MessageTypes'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import {
  ParticipantStatusEnum,
  ParticipantType,
} from '../../../../../redux/types/ParticipantTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { MySocket } from '../../../../../services/TindiSocket'
import {
  acceptFileType,
  acceptImageType,
} from '../../../../../utilities/upload_files/UploadFileUtil'
import { controlOverlaysActions } from '../../../../../redux/slices/ControlOverlaysSlice'
import PreviewFiles from '../../../overlays/PreviewFiles'
import { getTeammateInSingleConversation } from './../../../../../utilities/conversation/ConversationUtils'
import { conversationDetailActions } from '../../../../../redux/slices/ConversationDetailSlice'

const ChatFooter = () => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { addNewMessageToCurrentChat } = conversationDetailActions
  const { togglePreviewFilesInMessage } = controlOverlaysActions
  const dispatch = useAppDispatch()
  const [msg, setMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)
  const [attachFileType, setAttachFileType] = useState<
    AttachFileTypeEnum | undefined
  >(undefined)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [status, setStatus] = useState(ParticipantStatusEnum.STABLE)

  useEffect(() => {
    if (currentChat && currentUser) {
      let currentParti = currentChat.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (currentParti !== undefined) setStatus(currentParti.status)
    }

    setShowEmojiPicker(false)

    textAreaRef.current && textAreaRef.current.focus()
  }, [currentChat])

  const onClosePreviewFiles = () => {
    setFiles(null)
    setAttachFileType(undefined)
    dispatch(togglePreviewFilesInMessage())
  }

  const onAttachMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files

    if (files) {
      setFiles(files)
      dispatch(togglePreviewFilesInMessage())
    }
  }

  const sendMsg = (caption?: string) => {
    if (files || msg !== '') {
      const message: MessageType = {
        id: new Date().getTime(),
        conversation: currentChat as ConversationType,
        createdAt: new Date().toISOString(),
        delete: false,
        revoke: false,
        message: caption !== undefined ? caption : msg,
        sender: currentUser as UserType,
        status: MessageStatusEnum.SENT,
        type: files
          ? attachFileType === AttachFileTypeEnum.IMAGE
            ? MessageTypeEnum.IMAGE
            : MessageTypeEnum.FILE
          : MessageTypeEnum.TEXT,
        attachmentResponseList: null,
        socketFlag: new Date().getTime().toString(),
        isLoading: files ? true : undefined,
      }

      const receiver: UserType[] = []

      if (currentChat?.type === ConversationTypeEnum.SINGLE) {
        const targetUser: ParticipantType = getTeammateInSingleConversation(
          currentUser as UserType,
          currentChat as ConversationType
        )

        receiver.push(targetUser.user)
      } else {
        for (let iterator of currentChat?.participantResponse as ParticipantType[]) {
          receiver.push(iterator.user)
        }
      }

      MySocket.sendMessage({
        message,
        to: receiver,
      })

      dispatch(addNewMessageToCurrentChat(message))

      const formData = new FormData()
      formData.append('conversationId', message.conversation.id.toString())
      formData.append('senderId', message.sender.id.toString())
      formData.append('messageType', message.type.toString())
      formData.append('message', message.message)

      if (files) {
        for (const iterator of files) formData.append('file', iterator)
      }

      dispatch(
        saveMessage({
          formData,
          socketFlag: message.socketFlag as string,
          to: receiver,
        })
      )

      setMsg('')

      setFiles(null)
    }
  }

  const onSendMsg = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (msg !== '') {
      event.preventDefault()

      setShowEmojiPicker(false)

      sendMsg()
    }
  }

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const message = event.target.value

    setMsg(message)
  }

  const onInputKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const pressedKeyCode = event.key

    if (pressedKeyCode === 'Enter') {
      sendMsg()
      event.preventDefault()
    }
  }

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMsg(msg + emojiObject.emoji)
  }

  return (
    <div className='w-full px-1 md:px-0 py-2 mx-auto flex-initial transition-all'>
      <div className='w-full md:w-2/3 mx-auto relative'>
        {status === ParticipantStatusEnum.STABLE ? (
          <form ref={formRef} onSubmit={onSendMsg} encType='multipart/formData'>
            <div className='w-full flex flex-row justify-between items-center'>
              <div className='flex flex-row justify-between items-center w-full bg-white rounded-2xl px-2'>
                <Tooltip title='Đính kèm emoji'>
                  <Button
                    id='showEmojiPicker'
                    variant='contained'
                    sx={{
                      maxWidth: '2rem',
                      maxHeight: '2rem',
                      minWidth: '2rem',
                      minHeight: '2rem',
                      borderRadius: '50%',
                      bgcolor: 'transparent',
                      color: 'gray',
                      ml: 1,
                      '&:hover': {
                        bgcolor: 'transparent',
                        color: '#710e8c',
                      },
                    }}
                    disableElevation
                    onClick={() => {
                      setShowEmojiPicker(!showEmojiPicker)
                    }}
                  >
                    <Mood />
                  </Button>
                </Tooltip>
                <div className='absolute z-[100] left-0 bottom-full'>
                  {showEmojiPicker && (
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      lazyLoadEmojis={true}
                    />
                  )}
                </div>

                <TextareaAutosize
                  ref={textAreaRef}
                  onFocusCapture={() => {
                    MySocket.changeTypingStatus(
                      (currentChat as ConversationType).id,
                      (currentUser as UserType).id,
                      getTeammateInSingleConversation(
                        currentUser as UserType,
                        currentChat as ConversationType
                      ).user.id,
                      true
                    )
                  }}
                  onBlur={() => {
                    MySocket.changeTypingStatus(
                      (currentChat as ConversationType).id,
                      (currentUser as UserType).id,
                      getTeammateInSingleConversation(
                        currentUser as UserType,
                        currentChat as ConversationType
                      ).user.id,
                      false
                    )
                  }}
                  autoFocus
                  maxRows={4}
                  value={msg}
                  onKeyDown={onInputKeyPress}
                  placeholder='Viết tin nhắn nào...'
                  onChange={onInputChange}
                  onFocus={() => {
                    setShowEmojiPicker(false)
                  }}
                  className='flex-1 rounded-2xl bg-white py-3 transition-all border-2 border-transparent outline-none'
                />
                <div className='flex justify-end items-center'>
                  <Tooltip title='Đính kèm ảnh' placement='top'>
                    <Button
                      component='label'
                      id='showEmojiPicker'
                      variant='contained'
                      sx={{
                        maxWidth: '2rem',
                        maxHeight: '2rem',
                        minWidth: '2rem',
                        minHeight: '2rem',
                        borderRadius: '50%',
                        bgcolor: 'transparent',
                        color: 'gray',
                        '&:hover': {
                          bgcolor: 'transparent',
                          color: '#063c99',
                        },
                      }}
                      disableElevation
                      onClick={() => {
                        setAttachFileType(AttachFileTypeEnum.IMAGE)
                        setShowEmojiPicker(false)
                      }}
                    >
                      <ImageOutlined />
                      <input
                        type='file'
                        onChange={onAttachMessageChange}
                        multiple
                        hidden
                        accept={acceptImageType()}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title='Đính kèm file' placement='top'>
                    <Button
                      component='label'
                      id='showEmojiPicker'
                      variant='contained'
                      sx={{
                        maxWidth: '2rem',
                        maxHeight: '2rem',
                        minWidth: '2rem',
                        minHeight: '2rem',
                        borderRadius: '50%',
                        bgcolor: 'transparent',
                        color: 'gray',
                        ml: 1,
                        '&:hover': {
                          bgcolor: 'transparent',
                          color: '#063c99',
                        },
                      }}
                      disableElevation
                      onClick={() => {
                        setShowEmojiPicker(false)
                      }}
                    >
                      <AttachFile />
                      <input
                        type='file'
                        multiple
                        hidden
                        accept={acceptFileType()}
                      />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <Button
                type='submit'
                variant='contained'
                sx={{
                  maxWidth: '3rem',
                  maxHeight: '3rem',
                  minWidth: '3rem',
                  minHeight: '3rem',
                  borderRadius: '50%',
                  ml: 1,
                  bgcolor: 'white',
                  '&:hover': {
                    bgcolor: '#318eeb',
                    '& svg': {
                      fill: 'white',
                    },
                  },
                }}
                disableElevation
              >
                <Send
                  sx={{
                    fill: 'gray',
                    cursor: 'pointer',
                  }}
                />
              </Button>
            </div>
          </form>
        ) : (
          <div className='w-full py-3 rounded-lg bg-gray-200 text-center pointer-events-none'>
            <span className='italic text-sm text-center'>
              Bạn không được phép nhắn tin trong nhóm này
            </span>
          </div>
        )}
      </div>
      <PreviewFiles
        files={files}
        filesType={attachFileType as AttachFileTypeEnum}
        onClosePreviewOverlay={onClosePreviewFiles}
        preCaption={msg}
        onSendMessage={sendMsg}
      />
    </div>
  )
}

export default ChatFooter
