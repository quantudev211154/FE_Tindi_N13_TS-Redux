import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  conversationActions,
  conversationsControlState,
} from '../../../../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../../../../redux_hooks'
import LeftChat from './left_chat/LeftChat'
import RightChat from './right_chat/RightChat'
import { useAppDispatch } from './../../../../../../redux_hooks'
import { loadMessageOfConversation } from '../../../../../../redux/thunks/MessageThunks'
import { ConversationType } from '../../../../../../redux/types/ConversationTypes'

type Props = {
  chat: ConversationType
}

const Chat = ({ chat }: Props) => {
  const [chatId, setChatId] = useState<number>(-1)
  const dispatch = useAppDispatch()
  const { currentChat } = useAppSelector(conversationsControlState)
  const { changeCurrentChat } = conversationActions

  useEffect(() => {
    setChatId(chat.id)
  }, [])

  return (
    <Button
      variant='contained'
      sx={{
        textTransform: 'none',
        padding: '0.2rem 0.5rem',
        borderRadius: '1rem',
        backgroundColor: currentChat?.id !== chatId ? 'white' : '#3390ec',
        textAlign: 'none',
        transition: '0.2s ease',
        '&:hover': {
          backgroundColor: currentChat?.id !== chatId ? '#f2f0f0' : '#3390ec',
        },
      }}
      disableElevation
      className='bg-slate-200'
      onClick={() => {
        dispatch(changeCurrentChat(chatId))
      }}
    >
      <LeftChat chat={chat} />
      <RightChat />
    </Button>
  )
}

export default Chat
