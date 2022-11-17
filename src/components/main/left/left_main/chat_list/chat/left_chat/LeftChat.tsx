import { AVATAR_BASE } from '../../../../../../../constants/UserAvatarConstant'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../../../../../redux/types/ConversationTypes'
import { UserType } from '../../../../../../../redux/types/UserTypes'
import { useAppSelector } from '../../../../../../../redux_hooks'
import { getTeammateInSingleConversation } from '../../../../../../../utilities/conversation/ConversationUtils'
import GroupAvatar, {
  GroupAvatarSizeEnum,
} from '../../../../../../core/GroupAvatar'
import UserAvatar from '../../../../../../core/UserAvatar'
import ChatBrief from './chat_brief/ChatBrief'

type Props = {
  chat: ConversationType
}

const LeftChat = ({ chat }: Props) => {
  const { currentUser } = useAppSelector(authState)

  if (chat.type === ConversationTypeEnum.SINGLE) {
    const targetUser = getTeammateInSingleConversation(
      currentUser as UserType,
      chat as ConversationType
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
      <GroupAvatar
        groupName={chat.title}
        groupAvatar={chat.avatar}
        participants={chat.participantResponse}
        size={GroupAvatarSizeEnum.BASE}
      />
      <ChatBrief chat={chat} />
    </div>
  )
}

export default LeftChat
