import { AVATAR_BASE } from '../../../../../../../constants/UserAvatarConstant'
import UserAvatar from '../../../../../../core/UserAvatar'
import ChatBrief from './chat_brief/ChatBrief'

type Props = {}

const LeftChat = (props: Props) => {
  return (
    <div className=' left-chat py-1 min-w-0 flex-1 h-full flex flex-row justify-start items-center'>
      <UserAvatar name='Hoang Van Thai' avatar={''} size={AVATAR_BASE} />
      <ChatBrief />
    </div>
  )
}

export default LeftChat
