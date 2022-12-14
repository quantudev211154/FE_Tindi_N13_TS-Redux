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
import { loadMessageOfConversation } from '../../../../../../redux/thunks/MessageThunks'
import CurrentChatUtil from '../../../../../../class/CurrentChatClass'

type Props = {
  chat: ConversationType
}

const Chat = ({ chat }: Props) => {
  const dispatch = useAppDispatch()
  const { currentChat } = useAppSelector(conversationsControlState)
  const { openMessageList } = responsiveActions
  const { changeCurrentChat } = conversationActions
  const { setReplyingMessage, setLoadingMessageList, clearMessageList } =
    conversationDetailActions

  const onClickConversation = () => {
    dispatch(setReplyingMessage(null))
    dispatch(openMessageList(true))
    if (chat.id !== currentChat?.id) {
      dispatch(clearMessageList())
      dispatch(setLoadingMessageList())
      dispatch(changeCurrentChat(chat))
      dispatch(loadMessageOfConversation(chat.id))
      CurrentChatUtil.setCurrentChat(chat)
    }
  }

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
      onClick={onClickConversation}
    >
      <LeftChat chat={chat} />
      <RightChat chat={chat} />
    </Button>
  )
}

export default Chat
