import ChatFooter from './chat_footer/ChatFooter'
import ChatHeader from './chat_header/ChatHeader'
import ChatMain from './chat_main/ChatMain'

type Props = {}

const ChatContainer = (props: Props) => {
  return (
    <div className='w-full h-full z-40 flex flex-col justify-between items-start'>
      <ChatHeader />
      <ChatMain />
      <ChatFooter />
    </div>
  )
}

export default ChatContainer
