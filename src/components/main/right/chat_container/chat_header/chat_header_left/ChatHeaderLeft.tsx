import UserAvatar from '../../../../../../utilities/user_avatar/UserAvatar'
import { AVATAR_SMALL } from './../../../../../../constants/UserAvatarConstant'

type Props = {}

const ChatHeaderLeft = (props: Props) => {
  return (
    <div className='flex flex-row justify-start items-center whitespace-nowrap overflow-hidden text-ellipsis break-all'>
      <UserAvatar name='Hoang Van Thai' avatar={null} size={AVATAR_SMALL} />
      <div className='flex flex-col justify-start ml-3'>
        <span className='font-semibold'>Hoang Van Thai</span>
        <span className='text-[13px] text-gray-600'>
          Truy cập gần nhất vào hôm qua lúc 10:00
        </span>
      </div>
    </div>
  )
}

export default ChatHeaderLeft
