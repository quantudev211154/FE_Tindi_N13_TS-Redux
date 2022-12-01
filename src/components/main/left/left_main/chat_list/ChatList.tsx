import { Stack } from '@mui/material'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../../../redux_hooks'
import ChatListSkeleton from '../ChatListSkeleton'
import Chat from './chat/Chat'
import { useState, useEffect } from 'react'
import { ConversationType } from '../../../../../redux/types/ConversationTypes'
import { authState } from './../../../../../redux/slices/AuthSlice'
import { findConversation } from '../../../../../utilities/conversation/ConversationUtils'

const ChatList = () => {
  const { currentUser } = useAppSelector(authState)
  const { conversationList, isLoadingChatList, findConverKeyword } =
    useAppSelector(conversationsControlState)
  const [foundConvers, setFoundConvers] = useState<ConversationType[]>([])

  useEffect(() => {
    if (currentUser) {
      setFoundConvers(
        findConversation(findConverKeyword, currentUser, conversationList)
      )
    }
  }, [findConverKeyword])

  if (isLoadingChatList)
    return (
      <div className='w-full flex flex-col'>
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
        <ChatListSkeleton />
      </div>
    )

  return (
    <Stack direction='column' maxWidth='true'>
      {conversationList.length == 0 ? (
        <p className='text-center text-lg mt-10'>
          Bạn chưa có cuộc trò chuyện trò nào!
          <br />
          Hãy thêm những liên hệ mới và bắt đầu những cuộc trò chuyện bất tận
          thôi nào!
        </p>
      ) : (
        <></>
      )}
      {foundConvers.length !== 0 ? (
        foundConvers.map((conversation) => {
          return <Chat key={conversation.id} chat={conversation} />
        })
      ) : (
        <></>
      )}
      {foundConvers.length === 0 ? (
        conversationList.map((conversation) => {
          return <Chat key={conversation.id} chat={conversation} />
        })
      ) : (
        <></>
      )}
    </Stack>
  )
}

export default ChatList
