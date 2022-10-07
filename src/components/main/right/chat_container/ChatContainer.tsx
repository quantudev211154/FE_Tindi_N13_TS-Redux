import AddContactBar from './add_contact_bar/AddContactBar'
import ChatFooter from './chat_footer/ChatFooter'
import ChatHeader from './chat_header/ChatHeader'
import ChatMain from './chat_main/ChatMain'
import SearchExpanded from './expanded_search/SearchExpanded'

type Props = {}

const ChatContainer = (props: Props) => {
  return (
    <div className='w-full h-full z-40 flex flex-row overflow-hidden transition-all'>
      <div className='w-full h-full flex flex-col justify-between items-start transition-all'>
        <ChatHeader />
        <AddContactBar />
        <ChatMain />
        <ChatFooter />
      </div>
      <SearchExpanded />
    </div>
  )
}

export default ChatContainer
