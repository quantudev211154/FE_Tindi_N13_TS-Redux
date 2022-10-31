import { authState } from '../../../../../../redux/slices/AuthSlice'
import { conversationsControlState } from '../../../../../../redux/slices/ConversationsControlSlice'
import { ParticipantType } from '../../../../../../redux/types/ParticipantTypes'
import { useAppSelector } from '../../../../../../redux_hooks'
import UserAvatar from '../../../../../core/UserAvatar'
import { AVATAR_SMALL } from './../../../../../../constants/UserAvatarConstant'

type Props = {}

const ChatHeaderLeft = (props: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)

  if ((currentChat?.participantResponse as ParticipantType[]).length <= 2) {
    const targetItem = currentChat?.participantResponse.find(
      (item) => item.user.id !== currentUser?.id
    )

    return (
      <div className='flex flex-row justify-start items-center whitespace-nowrap overflow-hidden text-ellipsis break-all'>
        <UserAvatar
          name={targetItem?.user.fullName as string}
          avatar={targetItem?.user.avatar as string}
          size={AVATAR_SMALL}
        />
        <div className='flex flex-col justify-start ml-3'>
          <span className='font-semibold'>{targetItem?.user.fullName}</span>
          <span className='text-[13px] text-gray-600'>
            In testing - Truy cập gần nhất vào hôm qua lúc 10:00
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-row justify-start items-center whitespace-nowrap overflow-hidden text-ellipsis break-all'>
      <UserAvatar
        name={currentChat?.title as string}
        avatar={currentChat?.avatar as string}
        size={AVATAR_SMALL}
      />
      <div className='flex flex-col justify-start ml-3'>
        <span className='font-semibold'>{currentChat?.title as string}</span>
        <span className='text-[13px] text-gray-600'>
          In testing - Truy cập gần nhất vào hôm qua lúc 10:00
        </span>
      </div>
    </div>
  )
}

export default ChatHeaderLeft
