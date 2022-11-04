import MessageList from './message_list/MessageList'

const ChatMain = () => {
  return (
    <div className='chatmain max-w-[calc(100vw/3*2)] flex-auto relative overflow-y-scroll transition-all'>
      <MessageList />
    </div>
  )
}

export default ChatMain
