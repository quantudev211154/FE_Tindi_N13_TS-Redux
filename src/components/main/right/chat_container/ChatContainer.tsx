import { useEffect } from 'react'
import { conversationsControlState } from '../../../../redux/slices/ConversationsControlSlice'
import {
  currentChatNavigationState,
  toggleExpandedPanel,
} from '../../../../redux/slices/CurrentChatNavigationSlice'
import { loadMessageOfConversation } from '../../../../redux/thunks/MessageThunks'
import { useAppDispatch, useAppSelector } from '../../../../redux_hooks'
import ForwardMessage from '../../overlays/ForwardMessage'
import AddContactBar from './add_contact_bar/AddContactBar'
import ChatFooter from './chat_footer/ChatFooter'
import ChatHeader from './chat_header/ChatHeader'
import ChatMain from './chat_main/ChatMain'
import SearchExpanded from './expanded_search/SearchExpanded'

const ChatContainer = () => {
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(toggleExpandedPanel(false))
    dispatch(loadMessageOfConversation(currentChat?.id as number))
  }, [currentChat])

  return (
    <div className='w-full h-full z-40 flex overflow-hidden justify-between transition-all'>
      <div className='h-full flex flex-col transition-all flex-1'>
        <ChatHeader />
        <AddContactBar />
        <ChatMain />
        <ChatFooter />
      </div>
      <div
        style={{
          width: openExpandedPanel ? '18rem' : '0',
          transition: '.2s ease',
        }}
      >
        <SearchExpanded />
      </div>
      <div className='overlays flex-initial'>
        <ForwardMessage />
      </div>
    </div>
  )
}

export default ChatContainer
