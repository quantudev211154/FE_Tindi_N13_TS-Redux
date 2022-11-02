import { DoneAll } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import { MessageType } from '../../../../../../../redux/types/MessageTypes'
import { ParticipantType } from '../../../../../../../redux/types/ParticipantTypes'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'
import UserAvatar from '../../../../../../core/UserAvatar'
import ClipPathMsg from './ClipPathMsg'
import { conversationsControlState } from './../../../../../../../redux/slices/ConversationsControlSlice'
import { parseDate } from '../../../../../../../utilities/parseJavaDateToJSDate/ParseDate'
import {
  messageContextmenuActions,
  messageContextmenuState,
} from '../../../../../../../redux/slices/MessageContextmenuSlice'
import { ConversationTypeEnum } from '../../../../../../../redux/types/ConversationTypes'

type Props = {
  item: MessageType
}

const Messages = ({ item }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const ref = useRef<HTMLDivElement>(null)
  const [fromSelf, setFromSelf] = useState(false)
  const [targetUser, setTargetUser] = useState<ParticipantType | undefined>()
  const dispatch = useAppDispatch()
  const { currentMessage } = useAppSelector(messageContextmenuState)
  const { setCurrentMessage } = messageContextmenuActions
  const messageId = 'msgId#' + item.id

  useEffect(() => {
    setFromSelf(item.sender.id === currentUser?.id ? true : false)

    if (currentChat?.type !== ConversationTypeEnum.SINGLE) {
      const tmp = (currentChat?.participantResponse as ParticipantType[]).find(
        (t) => t.user.id !== currentUser?.id
      )

      setTargetUser(tmp)
    } else setTargetUser(undefined)

    window.onclick = () => {
      dispatch(setCurrentMessage(undefined))
    }

    ref.current!.scrollIntoView({ behavior: 'smooth' })
  }, [item])

  useEffect(() => {
    if (currentMessage?.id === item.id)
      ref.current!.classList.add('bg-slate-400')
    else ref.current!.classList.remove('bg-slate-400')
  }, [currentMessage])

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()

    dispatch(setCurrentMessage(item))
  }

  return (
    <div
      id={messageId}
      ref={ref}
      className='transition-all w-full'
      onContextMenu={onContextMenu}
    >
      {fromSelf ? (
        <div className='relative mx-auto w-2/3 flex flex-row justify-end py-1'>
          <div className='relative bg-[#eeffde] max-w-[90%] break-words px-2 py-3 pr-14 justify-end rounded-lg rounded-br-none'>
            <ClipPathMsg fromSelf={fromSelf} />
            <div className='break-words justify-end rounded-lg rounded-bl-none'>
              {item.delete ? (
                <p className='text-[.9rem] italic text-slate-500'>
                  Đã thu hồi tin nhắn
                </p>
              ) : (
                <p className='text-[.9rem]'>{item.message}</p>
              )}

              <div className='absolute right-1 bottom-[.01rem] text-green-500 flex flex-row items-center'>
                <p className='text-[0.7rem] mr-1'>
                  {parseDate(item.createdAt)}
                </p>
                <DoneAll sx={{ width: '1.2rem', height: '1.2rem' }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='relative w-2/3 mx-auto justify-start flex flex-row py-1'>
          <div className='max-w-[90%] mr-2 flex flex-col justify-end'>
            {targetUser !== undefined ? (
              <UserAvatar
                size='AVATAR_SMALL'
                name={targetUser.user.fullName}
                avatar={targetUser.user.avatar}
              />
            ) : (
              <></>
            )}
          </div>
          <div className='relative max-w-[80%]'>
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
