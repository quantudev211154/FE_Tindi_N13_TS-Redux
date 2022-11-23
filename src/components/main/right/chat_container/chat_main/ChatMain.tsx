import MessageList from './message_list/MessageList'

const ChatMain = () => {
  return (
    <div className='chatmain flex-1 relative overflow-y-scroll transition-all'>
      <MessageList />
    </div>
  )
}

export default ChatMain
