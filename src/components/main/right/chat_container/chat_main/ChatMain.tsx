import MessageList from './message_list/MessageList'

type Props = {}

const ChatMain = (props: Props) => {
  return (
    <div className='w-full flex-auto relative overflow-y-scroll'>
      <MessageList />
    </div>
  )
}

export default ChatMain
