import { Button } from '@mui/material'
import {
  conversationActions,
  conversationsControlState,
} from '../../../../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../../../../redux_hooks'
import LeftChat from './left_chat/LeftChat'
import RightChat from './right_chat/RightChat'
import { useAppDispatch } from './../../../../../../redux_hooks'
import { ConversationType } from '../../../../../../redux/types/ConversationTypes'
import { responsiveActions } from '../../../../../../redux/slices/Responsive'
import { conversationDetailActions } from '../../../../../../redux/slices/ConversationDetailSlice'

type Props = {
  chat: ConversationType
}

const Chat = ({ chat }: Props) => {
  const dispatch = useAppDispatch()
  const { currentChat } = useAppSelector(conversationsControlState)
  const { openMessageList } = responsiveActions
  const { changeCurrentChat } = conversationActions
  const { setReplyingMessage } = conversationDetailActions

  return (
    <Button
      variant='contained'
      sx={{
        textTransform: 'none',
        padding: '0.2rem 0.5rem',
        borderRadius: '1rem',
        backgroundColor: currentChat?.id !== chat.id ? 'white' : '#3390ec',
        textAlign: 'none',
        transition: 'none',
        '&:hover': {
          backgroundColor: currentChat?.id !== chat.id ? '#f2f0f0' : '#3390ec',
        },
      }}
      disableElevation
      className='bg-slate-200'
      onClick={() => {
        dispatch(setReplyingMessage(null))
        dispatch(openMessageList(true))
        dispatch(changeCurrentChat(chat))
      }}
    >
      <LeftChat chat={chat} />
      <RightChat chat={chat} />
    </Button>
  )
}

export default Chat
