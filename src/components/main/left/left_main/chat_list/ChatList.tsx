import { Stack } from '@mui/material'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../../../redux_hooks'
import ChatListSkeleton from '../ChatListSkeleton'
import Chat from './chat/Chat'

const ChatList = () => {
  const { conversationList, isLoadingChatList } = useAppSelector(
    conversationsControlState
  )

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
    <Stack direction='column' maxWidth='true' gap={1}>
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
      {conversationList.map((conversation) => {
        return <Chat key={conversation.id} chat={conversation} />
      })}
    </Stack>
  )
}

export default ChatList
