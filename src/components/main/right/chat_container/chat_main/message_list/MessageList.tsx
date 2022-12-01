import { useAppSelector } from '../../../../../../redux_hooks'
import Messages from './messages/Messages'
import { conversationDetailState } from './../../../../../../redux/slices/ConversationDetailSlice'
import MessageListSkeleton from './MessageListSkeleton'

const MessageList = () => {
  const { messageList, isLoadingMessageList } = useAppSelector(
    conversationDetailState
  )

  if (isLoadingMessageList)
    return (
      <div className='relative w-full h-full mx-auto transition-all'>
        <div className='w-full h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <MessageListSkeleton />
        </div>
      </div>
    )

  return (
    <div className='msgList relative flex-1 mx-auto transition-all'>
      {messageList.map((item) => (
        <Messages key={item.id} item={item} />
      ))}
    </div>
  )
}

export default MessageList
