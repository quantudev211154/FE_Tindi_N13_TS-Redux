import { DoneAll } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import { MessageType } from '../../../../../../../redux/types/MessageTypes'
import { ParticipantType } from '../../../../../../../redux/types/ParticipantTypes'
import { useAppSelector } from '../../../../../../../redux_hooks'
import UserAvatar from '../../../../../../core/UserAvatar'
import ClipPathMsg from './ClipPathMsg'
import { conversationsControlState } from './../../../../../../../redux/slices/ConversationsControlSlice'
import { parseDate } from '../../../../../../../utilities/parseJavaDateToJSDate/ParseDate'

type Props = {
  item: MessageType
}

const Messages = ({ item }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const ref = useRef<HTMLDivElement>(null)
  const [fromSelf, setFromSelf] = useState(false)
  const [targetUser, setTargetUser] = useState<ParticipantType>()

  useEffect(() => {
    ref.current!.scrollIntoView({ behavior: 'smooth' })

    setFromSelf(item.sender.id === currentUser?.id ? true : false)

    if ((currentChat?.participantRespones as ParticipantType[]).length <= 2) {
      const tmp = (currentChat?.participantRespones as ParticipantType[]).find(
        (t) => t.user.id !== currentUser?.id
      )

      setTargetUser(tmp)
    }
  }, [])

  return (
    <div ref={ref} className='transition-all'>
      {fromSelf ? (
        <div className='relative flex flex-row justify-end mt-[.5rem]'>
          <ClipPathMsg fromSelf={fromSelf} />
          <div className='relative bg-[#eeffde] max-w-[60%] break-words px-2 py-3 pr-14 justify-end rounded-lg rounded-br-none'>
            <p className='text-[.95rem]'>{item.message}</p>
            <div className='absolute right-1 bottom-[.05rem] text-green-500 flex flex-row items-center'>
              <p className='text-[0.7rem] mr-1'>
                {parseDate(item.createdAt)}
                {/* In testing */}
              </p>
              <DoneAll sx={{ width: '1.2rem', height: '1.2rem' }} />
            </div>
          </div>
        </div>
      ) : (
        <div className='relative justify-start mt-[.5rem] flex flex-row'>
          <div className='mr-2 flex flex-col justify-end'>
            {targetUser ? (
              <UserAvatar
                size='AVATAR_SMALL'
                name={targetUser.user.fullName}
                avatar={targetUser.user.avatar}
              />
            ) : (
              <UserAvatar
                size='AVATAR_SMALL'
                name={item.conversation.title}
                avatar={item.conversation.avatar}
              />
            )}
          </div>
          <div className='relative max-w-[60%]'>
            <ClipPathMsg fromSelf={fromSelf} />
            <div className='bg-white break-words p-2 pr-12 justify-end rounded-lg rounded-bl-none'>
              <p className='text-[.95rem]'>{item.message}</p>
              <div className='absolute right-1 bottom-[.05rem] text-slate-500'>
                <p className='text-[0.7rem]'>{parseDate(item.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
