import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../../../../redux_hooks'
import { conversationsControlState } from './../../../../../../../../redux/slices/ConversationsControlSlice'

type Props = {
  senderName: string
  message: string
  id: number
}

const LatestMessage = ({ senderName, message, id }: Props) => {
  const [chatId, setChatId] = useState(-1)
  const { currentChat } = useAppSelector(conversationsControlState)

  useEffect(() => {
    setChatId(id)
  }, [id])

  return (
    <div className='w-full whitespace-nowrap overflow-hidden text-ellipsis break-all'>
      <span
        style={
          currentChat?.id === chatId ? { color: 'white' } : { color: 'black' }
        }
        className='mr-1'
      >
        {senderName + ':'}
      </span>
      <span className='text-slate-600'>{message}</span>
    </div>
  )
}

export default LatestMessage
