import { AttachFile, Mood, PropaneSharp, Send } from '@mui/icons-material'
import { Button, Fab, TextareaAutosize } from '@mui/material'
import { nanoid } from '@reduxjs/toolkit'
import { EmojiClickData } from 'emoji-picker-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { SendMessageWithSocketPayload } from '../../../../../constants/SocketConstant'
import { authState } from '../../../../../redux/slices/AuthSlice'
import { conversationDetailActions } from '../../../../../redux/slices/ConversationDetailSlice'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import { saveMessage } from '../../../../../redux/thunks/MessageThunks'
import { ConversationType } from '../../../../../redux/types/ConversationTypes'
import {
  MessageStatusEnum,
  MessageType,
  MessageTypeEnum,
  SaveMessagePayload,
} from '../../../../../redux/types/MessageTypes'
import EmojiPicker from 'emoji-picker-react'
import { ParticipantType } from '../../../../../redux/types/ParticipantTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { MySocket } from '../../../../../services/TindiSocket'

const ChatFooter = () => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { addNewMessageToCurrentChat: addNewMessage } =
    conversationDetailActions
  const dispatch = useAppDispatch()
  const [msg, setMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const sendMsg = () => {
    if (msg !== '') {
      const message: MessageType = {
        id: nanoid(),
        conversation: currentChat as ConversationType,
        createdAt: new Date().toISOString(),
        delete: false,
        message: msg,
        sender: currentUser as UserType,
        status: MessageStatusEnum.SENT,
        type: MessageTypeEnum.TEXT,
      }

      dispatch(addNewMessage(message))

      const targetUser: ParticipantType = currentChat?.participantResponse.find(
        (item) => item.user.id !== (currentUser?.id as number)
      ) as ParticipantType

      const payload: SendMessageWithSocketPayload = {
        message,
        to: targetUser.user,
      }
      MySocket.sendMessage(payload)

      const willSaveMessage: SaveMessagePayload = {
        conversation: message.conversation,
        sender: message.sender,
        messageType: message.type,
        message: message.message,
      }
      dispatch(saveMessage(willSaveMessage))

      setMsg('')
    }
  }

  const onSendMsg = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    sendMsg()
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

  const onEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    setMsg(msg + emojiObject.emoji)
  }

  return (
    <div className='w-full py-2 mx-auto flex-initial transition-all'>
      <div className='w-2/3 mx-auto relative'>
        <form
          ref={formRef}
          onSubmit={onSendMsg}
          className='w-full flex flex-row justify-between items-center'
        >
          <Button
            id='showEmojiPicker'
            variant='contained'
            sx={{
              maxWidth: '2.5rem',
              maxHeight: '2.5rem',
              minWidth: '2.5rem',
              minHeight: '2.5rem',
              borderRadius: '50%',
              ml: 1,
              '&:hover': {
                bgcolor: '#318eeb',
                '& svg': {
                  fill: 'white',
                },
              },
            }}
            disableElevation
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker)
            }}
          >
            <Mood />
          </Button>
          <div className='absolute ttt left-0 bottom-full'>
            {showEmojiPicker && (
              <EmojiPicker onEmojiClick={onEmojiClick} lazyLoadEmojis />
            )}
          </div>

          <TextareaAutosize
            maxRows={4}
            value={msg}
            onKeyDown={onInputKeyPress}
            placeholder='Viết tin nhắn nào...'
            onChange={onInputChange}
            className='w-full rounded-2xl bg-white p-3 transition-all border-2 border-transparent outline-none'
          />
          <Button
            type='submit'
            variant='contained'
            sx={{
              maxWidth: '3.5rem',
              maxHeight: '3.5rem',
              minWidth: '3.5rem',
              minHeight: '3.5rem',
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
        </form>
      </div>
    </div>
  )
}

export default ChatFooter
