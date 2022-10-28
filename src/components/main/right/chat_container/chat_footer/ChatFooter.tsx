import { AttachFile, Mood, Send } from '@mui/icons-material'
import { Button, TextareaAutosize } from '@mui/material'
import { nanoid } from '@reduxjs/toolkit'
import { useEffect, useRef, useState } from 'react'
import { SendMessageWithSocketPayload } from '../../../../../constants/SocketConstant'
import { authState } from '../../../../../redux/slices/AuthSlice'
import { conversationDetailActions } from '../../../../../redux/slices/ConversationDetailSlice'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import { currentChatNavigationState } from '../../../../../redux/slices/CurrentChatNavigationSlice'
import { saveMessage } from '../../../../../redux/thunks/MessageThunks'
import { ConversationType } from '../../../../../redux/types/ConversationTypes'
import {
  MessageStatusEnum,
  MessageType,
  MessageTypeEnum,
  SaveMessagePayload,
} from '../../../../../redux/types/MessageTypes'
import { ParticipantType } from '../../../../../redux/types/ParticipantTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { MySocket } from '../../../../../services/TindiSocket'

const ChatFooter = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)
  const { addNewMessageToCurrentChat: addNewMessage } =
    conversationDetailActions
  const dispatch = useAppDispatch()
  const [msg, setMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    openExpandedPanel
      ? (ref.current!.style.width = '80%')
      : (ref.current!.style.width = '66.666667%')
  }, [openExpandedPanel])

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

      const targetUser: ParticipantType = currentChat?.participantRespones.find(
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

  return (
    <div ref={ref} className='w-2/3 py-2 mx-auto flex-initial transition-all'>
      <form
        ref={formRef}
        onSubmit={onSendMsg}
        className='w-full flex flex-row justify-between items-center'
      >
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
  )
}

export default ChatFooter
