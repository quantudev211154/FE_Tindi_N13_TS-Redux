import { Stack } from '@mui/material'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import { useAppSelector } from '../../../../../redux_hooks'
import Chat from './chat/Chat'

const ChatList = () => {
  const { conversationList } = useAppSelector(conversationsControlState)

  return (
    <Stack direction='column' maxWidth='true' gap={1}>
      {conversationList.map((conversation) => (
        <Chat
          key={conversation.id}
          id={conversation.id}
          title={conversation.title}
          avatar={conversation.avatar}
        />
      ))}
    </Stack>
  )
}

export default ChatList
