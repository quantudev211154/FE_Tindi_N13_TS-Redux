import { useAppSelector } from '../../../../../../../../redux_hooks'
import LatestMessage from './LatestMessage'
import { useEffect, useState } from 'react'
import { conversationsControlState } from '../../../../../../../../redux/slices/ConversationsControlSlice'

type Props = {
  id: number
  title: string
}

const ChatBrief = ({ title, id }: Props) => {
  const [chatId, setChatId] = useState(-1)
  const { currentChat } = useAppSelector(conversationsControlState)

  useEffect(() => {
    setChatId(id)
  }, [id])

  return (
    <div className='ml-3 h-full flex flex-col justify-between overflow-hidden text-black text-left'>
      <p
        style={
          currentChat?.id === chatId ? { color: 'white' } : { color: 'black' }
        }
        className='text-[15px] font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all'
      >
        {title}
      </p>
      <LatestMessage senderName='Khoa' message='Ban co nha chu?' id={id} />
    </div>
  )
}

export default ChatBrief
