import { conversationsControlState } from '../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../redux_hooks'
import ChatContainer from './chat_container/ChatContainer'
import Welcome from './welcome/Welcome'

const RightCol = () => {
  const { currentChatId } = useAppSelector(conversationsControlState)

  return (
    <div className='flex-1 h-full bg-gray-300'>
      {!currentChatId ? <Welcome /> : <ChatContainer />}
    </div>
  )
}

export default RightCol
