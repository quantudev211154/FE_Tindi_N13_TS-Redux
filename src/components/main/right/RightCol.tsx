import { useEffect } from 'react'
import { conversationsControlState } from '../../../redux/slices/ConversationsControlSlice'
import { loadMessageOfConversation } from '../../../redux/thunks/MessageThunks'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import ChatContainer from './chat_container/ChatContainer'
import Welcome from './welcome/Welcome'

const RightCol = () => {
  const { currentChat } = useAppSelector(conversationsControlState)

  return (
    <div className='flex-1 h-full bg-gray-300'>
      {!currentChat?.id ? <Welcome /> : <ChatContainer />}
    </div>
  )
}

export default RightCol
