import MessageList from './message_list/MessageList'

const ChatMain = () => {
  return (
    <div className='chatmain flex-auto relative overflow-y-scroll transition-all'>
      <MessageList />
    </div>
  )
}

export default ChatMain
