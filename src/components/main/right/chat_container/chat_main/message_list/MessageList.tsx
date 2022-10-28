import { useEffect, useRef } from 'react'
import { authState } from '../../../../../../redux/slices/AuthSlice'
import { currentChatNavigationState } from '../../../../../../redux/slices/CurrentChatNavigationSlice'
import { useAppSelector } from '../../../../../../redux_hooks'
import Messages from './messages/Messages'
import { conversationDetailState } from './../../../../../../redux/slices/ConversationDetailSlice'

type Props = {}

const MessageList = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)
  const { messageList } = useAppSelector(conversationDetailState)

  useEffect(() => {
    openExpandedPanel
      ? (ref.current!.style.width = '80%')
      : (ref.current!.style.width = '66.666667%')
  }, [openExpandedPanel])

  return (
    <div ref={ref} className='w-2/3 mx-auto transition-all'>
      {messageList.map((item) => (
        <Messages key={item.id} item={item} />
      ))}
    </div>
  )
}

export default MessageList
