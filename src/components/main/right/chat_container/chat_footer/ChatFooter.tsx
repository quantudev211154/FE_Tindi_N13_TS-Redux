import {
  AttachFile,
  ClearOutlined,
  ImageOutlined,
  Mood,
  ReplyOutlined,
  Send,
} from '@mui/icons-material'
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
import { ParticipantStatusEnum } from '../../../../../redux/types/ParticipantTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { MySocket } from '../../../../../services/TindiSocket'
import {
  acceptFileType,
  acceptImageType,
  canUploadFiles,
} from '../../../../../utilities/upload_files/UploadFileUtil'
import { controlOverlaysActions } from '../../../../../redux/slices/ControlOverlaysSlice'
import PreviewFiles from '../../../overlays/PreviewFiles'
import { getTeammateInSingleConversation } from './../../../../../utilities/conversation/ConversationUtils'
import {
  conversationDetailActions,
  conversationDetailState,
} from '../../../../../redux/slices/ConversationDetailSlice'
import { showMessageHandlerResultToSnackbar } from '../../../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import { messageContextmenuActions } from '../../../../../redux/slices/MessageContextmenuSlice'

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
  const { replyingMessage, isLoadingMessageList } = useAppSelector(
    conversationDetailState
  )
  const { setReplyingMessage } = conversationDetailActions
  const { setHandlerResult } = messageContextmenuActions

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

  useEffect(() => {
    if (replyingMessage && textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }, [replyingMessage])

  const onClosePreviewFiles = () => {
    setFiles(null)
    setAttachFileType(undefined)
    dispatch(togglePreviewFilesInMessage())
  }

  const onAttachMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files

    if (files && files.length > 0) {
      if (canUploadFiles(files)) {
        setFiles(files)
        dispatch(togglePreviewFilesInMessage())
      } else {
        showMessageHandlerResultToSnackbar(
          false,
          'Quá dung lượng cho phép. Tối đa là 25MB.',
          dispatch,
          setHandlerResult
        )
      }
    }
  }

  const sendMsg = (caption?: string) => {
    if (currentChat && (files || msg !== '')) {
      const message: MessageType = {
        id: new Date().getTime(),
        conversation: currentChat as ConversationType,
        createdAt: new Date().toISOString(),
        delete: false,
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
        replyTo: replyingMessage,
        participantDeleted: [],
      }

      const receiver: UserType[] = currentChat.participantResponse.map(
        (parti) => parti.user
      )

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

      if (replyingMessage) {
        formData.append('replyTo', replyingMessage.id as string)
      }

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

      dispatch(setReplyingMessage(null))

      setFiles(null)
    }
  }

  const onSendMsg = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (msg !== '') {
      event.preventDefault()

      setShowEmojiPicker(false)

      sendMsg()

      dispatch(setReplyingMessage(null))
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
    <div className='w-full px-1 md:px-0 py-2 flex-initial transition-all flex justify-center items-center'>
      <div className='w-full md:w-2/3 relative bg-white rounded-lg'>
        {status === ParticipantStatusEnum.STABLE ? (
          <form
            ref={formRef}
            onSubmit={onSendMsg}
            encType='multipart/formData'
            className='flex flex-col w-full'
          >
            {currentUser && replyingMessage ? (
              <div className='px-2 py-1 border-b-[1px] border-blue-300 w-full flex justify-between items-center'>
                <div className='w-full flex justify-start items-center '>
                  <ReplyOutlined
                    sx={{ color: '#2078c9', width: 30, height: 30 }}
                  />
                  <div className='w-full whitespace-pre-wrap overflow-hidden text-ellipsis break-all'>
                    <a
                      href={`#msg#${replyingMessage.id}`}
                      className='pl-3 pr-1 rounded-md max-w-full max-h-20  overflow-y-auto flex flex-col w-full transition-all hover:bg-gray-200 '
                    >
                      <p className='font-medium text-blue-700'>
                        {replyingMessage.sender.id === currentUser.id
                          ? 'Bạn'
                          : replyingMessage.sender.fullName}
                      </p>
                      <p className='text-sm'>{replyingMessage.message}</p>
                    </a>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    dispatch(setReplyingMessage(null))

                    if (textAreaRef.current) {
                      textAreaRef.current.focus()
                    }
                  }}
                  variant='contained'
                  sx={{
                    maxWidth: '2.5rem',
                    maxHeight: '2.5rem',
                    minWidth: '2.5rem',
                    minHeight: '2.5rem',
                    borderRadius: '50%',
                    bgcolor: 'transparent',
                    '&:hover': {
                      bgcolor: '#eeeee4',
                    },
                  }}
                  disableElevation
                >
                  <ClearOutlined sx={{ fill: 'gray', width: 26, height: 26 }} />
                </Button>
              </div>
            ) : (
              <></>
            )}
            <div className='w-full flex flex-row justify-between items-center'>
              <div className='h-full flex flex-row justify-between items-center w-full bg-white rounded-2xl px-2'>
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
                  maxRows={isLoadingMessageList ? 1 : 4}
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
                        setAttachFileType(AttachFileTypeEnum.FILE)
                        setShowEmojiPicker(false)
                      }}
                    >
                      <AttachFile />
                      <input
                        onChange={onAttachMessageChange}
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
              Bạn không được phép nhắn tin trong{' '}
              {currentChat && currentChat.type === ConversationTypeEnum.GROUP
                ? 'nhóm'
                : 'cuộc trò chuyện'}{' '}
              này
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
