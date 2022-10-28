import { useEffect, useState } from 'react'
import { ConversationType } from '../../../../../../../../redux/types/ConversationTypes'
import { useAppSelector } from '../../../../../../../../redux_hooks'
import { conversationsControlState } from './../../../../../../../../redux/slices/ConversationsControlSlice'

type Props = {
  chat: ConversationType
}

const LatestMessage = ({ chat }: Props) => {
  const [chatId, setChatId] = useState(-1)
  const { currentChat } = useAppSelector(conversationsControlState)

  useEffect(() => {
    setChatId(chat.id)
  }, [chat])

  return (
    <div className='w-full whitespace-nowrap overflow-hidden text-ellipsis break-all'>
      <span
        style={
          currentChat?.id === chatId ? { color: 'white' } : { color: 'black' }
        }
        className='mr-1'
      >
        {/* {senderName + ':'} */}
        In testing
      </span>
      <span className='text-slate-600'>In testing</span>
    </div>
  )
}

export default LatestMessage
