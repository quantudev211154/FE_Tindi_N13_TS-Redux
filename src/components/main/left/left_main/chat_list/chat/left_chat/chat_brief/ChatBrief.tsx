import { useAppSelector } from '../../../../../../../../redux_hooks'
import LatestMessage from './LatestMessage'
import { useEffect, useState } from 'react'
import { conversationsControlState } from '../../../../../../../../redux/slices/ConversationsControlSlice'
import { ConversationType } from '../../../../../../../../redux/types/ConversationTypes'
import { authState } from '../../../../../../../../redux/slices/AuthSlice'

type Props = {
  chat: ConversationType
}

const ChatBrief = ({ chat }: Props) => {
  const [chatId, setChatId] = useState(-1)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { currentUser } = useAppSelector(authState)

  useEffect(() => {
    setChatId(chat.id)
  }, [chat])

  if (chat.participantResponse.length <= 2) {
    const targetUser = chat.participantResponse.find(
      (item) => item.user.id !== currentUser?.id
    )

    return (
      <div className='ml-3 h-full flex flex-col justify-between overflow-hidden text-black text-left'>
        <p
          style={
            currentChat?.id === chatId ? { color: 'white' } : { color: 'black' }
          }
          className='text-[15px] font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all'
        >
          {targetUser?.user.fullName}
        </p>
        <LatestMessage chat={chat} />
      </div>
    )
  }

  return (
    <div className='ml-3 h-full flex flex-col justify-between overflow-hidden text-black text-left'>
      <p
        style={
          currentChat?.id === chatId ? { color: 'white' } : { color: 'black' }
        }
        className='text-[15px] font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all'
      >
        {chat.title}
      </p>
      <LatestMessage chat={chat} />
    </div>
  )
}

export default ChatBrief
