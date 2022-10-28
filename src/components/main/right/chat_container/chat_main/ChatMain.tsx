import { authState } from '../../../../../redux/slices/AuthSlice'
import { conversationDetailState } from '../../../../../redux/slices/ConversationDetailSlice'
import { useAppSelector } from '../../../../../redux_hooks'
import MessageList from './message_list/MessageList'

const ChatMain = () => {
  const { currentUser } = useAppSelector(authState)
  const { messageList } = useAppSelector(conversationDetailState)

  return (
    <div className='w-full flex-auto relative overflow-y-scroll'>
      <MessageList />
    </div>
  )
}

export default ChatMain
