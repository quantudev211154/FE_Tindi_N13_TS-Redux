import { useEffect, useState } from 'react'
import { authState } from '../../../../../../../../redux/slices/AuthSlice'
import { ConversationType } from '../../../../../../../../redux/types/ConversationTypes'
import { MessageTypeEnum } from '../../../../../../../../redux/types/MessageTypes'
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
    <div
      style={
        currentChat?.id === chat.id ? { color: 'white' } : { color: 'gray' }
      }
      className='w-full whitespace-nowrap overflow-hidden text-ellipsis break-all'
    >
      <span
        style={
          currentChat?.id === chat.id ? { color: 'white' } : { color: 'gray' }
        }
        className='mr-1'
      >
        {senderName}
      </span>
      <span
        style={
          currentChat?.id === chat.id ? { color: 'white' } : { color: 'gray' }
        }
        className='text-slate-600'
      >
        {chat.messageLatest
          ? chat.messageLatest.type === MessageTypeEnum.TEXT
            ? chat.messageLatest.message
            : chat.messageLatest.type === MessageTypeEnum.IMAGE
            ? 'Ảnh'
            : 'File'
          : ''}
      </span>
    </div>
  )
}

export default LatestMessage
