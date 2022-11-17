import { Tooltip } from '@mui/material'
import {
  AVATAR_BASE,
  AVATAR_LARGE,
  AVATAR_MINI,
} from '../../constants/UserAvatarConstant'
import { ParticipantType } from '../../redux/types/ParticipantTypes'
import UserAvatar from './UserAvatar'

export enum GroupAvatarSizeEnum {
  BASE,
  LARGE,
}

type Props = {
  groupName: string
  groupAvatar: string
  participants: ParticipantType[]
  size: GroupAvatarSizeEnum
}

const GroupAvatar = ({ groupName, groupAvatar, participants, size }: Props) => {
  if (!groupAvatar.startsWith('#'))
    return (
      <UserAvatar
        name={groupName}
        avatar={groupAvatar}
        size={size === GroupAvatarSizeEnum.BASE ? AVATAR_BASE : AVATAR_LARGE}
      />
    )

  if (participants.length === 2)
    return (
      <div className='relative flex flex-row flex-wrap justify-center items-center'>
        <UserAvatar
          name={participants[0].user.fullName}
          avatar={participants[0].user.avatar}
          size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
        />
        <UserAvatar
          name={participants[1].user.fullName}
          avatar={participants[1].user.avatar}
          size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
        />
      </div>
    )
  if (participants.length === 3)
    return (
      <div className='relative flex flex-col flex-wrap justify-center items-center'>
        <div className='flex flex-row justify-center items-center'>
          <UserAvatar
            name={participants[0].user.fullName}
            avatar={participants[0].user.avatar}
            size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
          />
          <UserAvatar
            name={participants[1].user.fullName}
            avatar={participants[1].user.avatar}
            size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
          />
        </div>
        <div className='flex flex-row justify-center items-center'>
          <UserAvatar
            name={participants[2].user.fullName}
            avatar={participants[2].user.avatar}
            size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
          />
        </div>
      </div>
    )

  if (participants.length === 4)
    return (
      <div className='relative flex flex-col flex-wrap justify-center items-center'>
        <div className='flex flex-row justify-center items-center'>
          <UserAvatar
            name={participants[0].user.fullName}
            avatar={participants[0].user.avatar}
            size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
          />
          <UserAvatar
            name={participants[1].user.fullName}
            avatar={participants[1].user.avatar}
            size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
          />
        </div>
        <div className='flex flex-row justify-center items-center'>
          <UserAvatar
            name={participants[2].user.fullName}
            avatar={participants[2].user.avatar}
            size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
          />
          <UserAvatar
            name={participants[3].user.fullName}
            avatar={participants[3].user.avatar}
            size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
          />
        </div>
      </div>
    )

  return (
    <div className='relative flex flex-col flex-wrap justify-center items-center'>
      <div className='flex flex-row justify-center items-center'>
        <UserAvatar
          name={participants[0].user.fullName}
          avatar={participants[0].user.avatar}
          size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
        />
        <UserAvatar
          name={participants[1].user.fullName}
          avatar={participants[1].user.avatar}
          size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
        />
      </div>
      <div className='flex flex-row justify-center items-center'>
        <UserAvatar
          name={participants[2].user.fullName}
          avatar={participants[2].user.avatar}
          size={size === GroupAvatarSizeEnum.BASE ? AVATAR_MINI : AVATAR_BASE}
        />
        <div
          style={
            size === GroupAvatarSizeEnum.BASE
              ? { width: '1.65rem', height: '1.65rem' }
              : { width: '2.75rem', height: '2.75rem' }
          }
          className='relative rounded-full bg-cyan-600 cursor-pointer'
        >
          <Tooltip title={`Còn ${participants.length - 3} thành viên nữa`}>
            <span className='text-white font-semibold absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              +{participants.length - 3}
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default GroupAvatar
