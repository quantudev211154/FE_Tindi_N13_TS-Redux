import React from 'react'
import { AVATAR_BASE, AVATAR_SMALL } from '../../constants/UserAvatarConstant'
import { authState } from '../../redux/slices/AuthSlice'
import { MessageType } from '../../redux/types/MessageTypes'
import { useAppSelector } from '../../redux_hooks'
import { parseDate } from '../../utilities/parseJavaDateToJSDate/ParseDate'
import UserAvatar from './UserAvatar'

type Props = {
  message: MessageType
}

const FoundMessage = ({ message }: Props) => {
  const { currentUser } = useAppSelector(authState)

  return (
    <div className='flex items-center w-full rounded-2xl mb-2 p-2 cursor-pointer bg-slate-200 hover:bg-slate-300 transition-all'>
      <UserAvatar
        name={message.sender.fullName}
        avatar={message.sender.avatar}
        size={AVATAR_SMALL}
      />
      <div className='flex flex-col justify-start flex-1 ml-3'>
        <div className='flex justify-between items-center'>
          <span className='font-medium'>
            {currentUser && message.sender.id === currentUser.id
              ? 'Bạn'
              : message.sender.fullName}
          </span>
          <span className='text-slate-800 text-sm'>
            {parseDate(message.createdAt)}
          </span>
        </div>
        <span>{message.message}</span>
      </div>
    </div>
  )
}

export default FoundMessage
