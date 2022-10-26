import { AVATAR_BASE } from '../../../../../../../constants/UserAvatarConstant'
import UserAvatar from '../../../../../../core/UserAvatar'
import ChatBrief from './chat_brief/ChatBrief'

type Props = {
  id: number
  avatar: string
  title: string
}

const LeftChat = ({ avatar, title, id }: Props) => {
  return (
    <div className=' left-chat py-1 min-w-0 flex-1 h-full flex flex-row justify-start items-center'>
      <UserAvatar name={title} avatar={avatar} size={AVATAR_BASE} />
      <ChatBrief id={id} title={title} />
    </div>
  )
}

export default LeftChat
