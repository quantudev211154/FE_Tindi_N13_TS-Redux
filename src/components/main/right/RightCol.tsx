import { conversationsControlState } from '../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../redux_hooks'
import ChatContainer from './chat_container/ChatContainer'
import Welcome from './welcome/Welcome'

const RightCol = () => {
  const { currentChat } = useAppSelector(conversationsControlState)

  return (
    <div className='flex-auto h-full bg-gray-300'>
      {!currentChat?.id ? <Welcome /> : <ChatContainer />}
    </div>
  )
}

export default RightCol
