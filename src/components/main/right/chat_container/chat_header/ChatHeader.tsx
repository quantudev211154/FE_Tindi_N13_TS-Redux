import ChatHeaderLeft from './chat_header_left/ChatHeaderLeft'
import ChatHeaderRight from './chat_header_right/ChatHeaderRight'

const ChatHeader = () => {
  return (
    <div className='bg-white px-7 py-1 w-full flex flex-initial flex-row justify-between items-center shadow-md z-20'>
      <ChatHeaderLeft />
      <ChatHeaderRight />
    </div>
  )
}

export default ChatHeader
