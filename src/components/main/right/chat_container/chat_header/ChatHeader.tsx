import BackToConversationList from './BackToConversationList'
import ChatHeaderLeft from './chat_header_left/ChatHeaderLeft'
import ChatHeaderRight from './chat_header_right/ChatHeaderRight'

const ChatHeader = () => {
  return (
    <div className='bg-white py-1 w-full flex flex-initial flex-row justify-between items-center shadow-md z-20'>
      <div className='flex justify-start items-center pl-3'>
        <BackToConversationList />
        <ChatHeaderLeft />
      </div>
      <ChatHeaderRight />
    </div>
  )
}

export default ChatHeader
