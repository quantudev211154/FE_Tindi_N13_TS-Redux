import { useAppSelector } from '../../../../../../../../redux_hooks'
import LatestMessage from './LatestMessage'
import { conversationsControlState } from '../../../../../../../../redux/slices/ConversationsControlSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../../../../../../redux/types/ConversationTypes'
import { authState } from '../../../../../../../../redux/slices/AuthSlice'
import { getTeammateInSingleConversation } from '../../../../../../../../utilities/conversation/ConversationUtils'
import { UserType } from '../../../../../../../../redux/types/UserTypes'

type Props = {
  chat: ConversationType
}

const ChatBrief = ({ chat }: Props) => {
  const { currentChat } = useAppSelector(conversationsControlState)
  const { currentUser } = useAppSelector(authState)

  return (
    <div className='ml-3 h-full flex flex-col justify-between overflow-hidden text-black text-left'>
      <p
        style={
          currentChat?.id === chat.id ? { color: 'white' } : { color: 'black' }
        }
        className='text-[15px] font-medium text-lg mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all'
      >
        {currentUser && chat.type === ConversationTypeEnum.GROUP
          ? chat.title
          : getTeammateInSingleConversation(currentUser as UserType, chat).user
              .fullName}
      </p>
      <LatestMessage chat={chat} />
    </div>
  )
}

export default ChatBrief
