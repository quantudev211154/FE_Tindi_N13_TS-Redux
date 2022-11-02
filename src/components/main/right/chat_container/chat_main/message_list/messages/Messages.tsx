import { DoneAll, DoneOutlined } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import {
  MessageStatusEnum,
  MessageType,
} from '../../../../../../../redux/types/MessageTypes'
import { ParticipantType } from '../../../../../../../redux/types/ParticipantTypes'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'
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
  const dispatch = useAppDispatch()
  const { currentMessage } = useAppSelector(messageContextmenuState)
  const { setCurrentMessage } = messageContextmenuActions
  const messageId = 'msgId#' + item.id

  useEffect(() => {
    setFromSelf(item.sender.id === currentUser?.id ? true : false)

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
      <div
        style={{
          justifyContent: fromSelf ? 'flex-end' : 'flex-start',
        }}
        className='relative w-2/3 mx-auto flex flex-row py-1'
      >
        <ClipPathMsg fromSelf={fromSelf} />
        <div
          style={{
            backgroundColor: fromSelf ? '#eeffde' : 'white',
            borderRadius: fromSelf
              ? '.75rem .75rem 0 .75rem'
              : '.75rem .75rem .75rem 0',
          }}
          className='relative w-fit min-w-[20%] max-w-[80%] p-2'
        >
          <p
            style={{
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              textAlign: 'initial',
              display: 'flow-root',
              unicodeBidi: 'plaintext',
              lineHeight: 1.3125,
              paddingBottom: item.delete ? 0 : '.85rem',
              fontStyle: item.delete ? 'italic' : 'normal',
              color: item.delete ? 'rgb(100,116,139)' : 'black',
            }}
            className='relative text-[.95rem]'
          >
            {item.delete ? 'Tin nhắn đã thu hồi' : item.message}
          </p>
          <span className='absolute bottom-0 right-0'>
            <span className='text-[.7rem] mr-1 text-slate-500'>
              {item.delete ? '' : parseDate(item.createdAt)}
            </span>
            <span className='text-[.7rem] mr-1 text-green-500'>
              {!item.delete ? (
                item.status === MessageStatusEnum.SENT ? (
                  <DoneAll sx={{ width: '1.2rem', height: '1.2rem' }} />
                ) : (
                  <DoneOutlined sx={{ width: '1.2rem', height: '1.2rem' }} />
                )
              ) : (
                <></>
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Messages
