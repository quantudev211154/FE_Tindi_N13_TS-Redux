import BackToConversationList from './BackToConversationList'
import ChatHeaderLeft from './chat_header_left/ChatHeaderLeft'
import ChatHeaderRight from './chat_header_right/ChatHeaderRight'

const ChatHeader = () => {
  return (
    <div className='bg-white min-h-[3.8rem] py-1 w-full flex flex-initial flex-row justify-between items-center shadow-md z-20'>
      <div className='flex h-full justify-start items-center pl-3'>
        <BackToConversationList />
        <ChatHeaderLeft />
      </div>
      <ChatHeaderRight />
    </div>
  )
}

export default ChatHeader
