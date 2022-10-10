import { useEffect, useRef } from 'react'
import { currentChatNavigationState } from '../../../../../../redux/slices/CurrentChatNavigationSlice'
import { useAppSelector } from '../../../../../../redux_hooks'
import Messages from './messages/Messages'

type Props = {}

const MessageList = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)

  useEffect(() => {
    openExpandedPanel
      ? (ref.current!.style.width = '80%')
      : (ref.current!.style.width = '66.666667%')
  }, [openExpandedPanel])

  return (
    <div ref={ref} className='w-2/3 mx-auto transition-all'>
      <Messages fromSelf={true} />
      <Messages fromSelf={false} />
      <Messages fromSelf={true} />
      <Messages fromSelf={true} />
      <Messages fromSelf={true} />
      <Messages fromSelf={false} />
      <Messages fromSelf={true} />
      <Messages fromSelf={false} />
      <Messages fromSelf={true} />
      <Messages fromSelf={true} />
      <Messages fromSelf={false} />
      <Messages fromSelf={false} />
      <Messages fromSelf={false} />
      <Messages fromSelf={true} />
    </div>
  )
}

export default MessageList
