import { useEffect, useState } from 'react'
import { authState } from '../../../../../../../../redux/slices/AuthSlice'
import { ConversationType } from '../../../../../../../../redux/types/ConversationTypes'
import { useAppSelector } from '../../../../../../../../redux_hooks'
import { conversationsControlState } from './../../../../../../../../redux/slices/ConversationsControlSlice'

type Props = {
  chat: ConversationType
}

const LatestMessage = ({ chat }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const [senderName, setSenderName] = useState('')

  useEffect(() => {
    if (chat.messageLatest?.sender) {
      const latestMsg = chat.messageLatest

      if (latestMsg.sender.id !== currentUser?.id)
        setSenderName(latestMsg.sender.fullName)
    }
  }, [])

  return (
    <div className='w-full whitespace-nowrap overflow-hidden text-ellipsis break-all'>
      <span
        style={
          currentChat?.id === chat.id ? { color: 'white' } : { color: 'black' }
        }
        className='mr-1'
      >
        {senderName}
      </span>
      <span className='text-slate-600'>
        {chat.messageLatest ? chat.messageLatest.message : ''}
      </span>
    </div>
  )
}

export default LatestMessage
