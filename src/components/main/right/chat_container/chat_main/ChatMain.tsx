import MessageList from './message_list/MessageList'

const ChatMain = () => {
  return (
    <div className='w-full flex-auto relative overflow-y-scroll transition-all'>
      <MessageList />
    </div>
  )
}

export default ChatMain
