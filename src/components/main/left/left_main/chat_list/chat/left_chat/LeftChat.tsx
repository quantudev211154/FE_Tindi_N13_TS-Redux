import { AVATAR_BASE } from '../../../../../../../constants/UserAvatarConstant'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import { ConversationType } from '../../../../../../../redux/types/ConversationTypes'
import { useAppSelector } from '../../../../../../../redux_hooks'
import UserAvatar from '../../../../../../core/UserAvatar'
import ChatBrief from './chat_brief/ChatBrief'

type Props = {
  chat: ConversationType
}

const LeftChat = ({ chat }: Props) => {
  const { currentUser } = useAppSelector(authState)

  if (chat.participantResponse.length <= 2) {
    const targetUser = chat.participantResponse.find(
      (user) => user.user.id !== currentUser?.id
    )

    return (
      <div className=' left-chat py-1 min-w-0 flex-1 h-full flex flex-row justify-start items-center'>
        <UserAvatar
          name={targetUser?.user.fullName as string}
          avatar={targetUser?.user.avatar as string}
          size={AVATAR_BASE}
        />
        <ChatBrief chat={chat} />
      </div>
    )
  }

  return (
    <div className=' left-chat py-1 min-w-0 flex-1 h-full flex flex-row justify-start items-center'>
      <UserAvatar name={chat.title} avatar={chat.avatar} size={AVATAR_BASE} />
      <ChatBrief chat={chat} />
    </div>
  )
}

export default LeftChat
