import {
  DoneAll,
  DoneOutlined,
  InsertDriveFileOutlined,
} from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import {
  AttachFileTypeEnum,
  MessageStatusEnum,
  MessageType,
} from '../../../../../../../redux/types/MessageTypes'
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
import { getTypeOfAttachment } from '../../../../../../../utilities/message_utils/MessageUtils'
import { CircularProgress } from '@mui/material'
import { ConversationTypeEnum } from '../../../../../../../redux/types/ConversationTypes'
import UserAvatar from '../../../../../../core/UserAvatar'
import {
  AVATAR_SMALL,
  AVATAR_SMALL_IMG_SIZE,
} from '../../../../../../../constants/UserAvatarConstant'
import { conversationDetailState } from '../../../../../../../redux/slices/ConversationDetailSlice'

type Props = {
  item: MessageType
}

const Messages = ({ item }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { messageList } = useAppSelector(conversationDetailState)
  const ref = useRef<HTMLDivElement>(null)
  const [fromSelf, setFromSelf] = useState(false)
  const dispatch = useAppDispatch()
  const { currentMessage } = useAppSelector(messageContextmenuState)
  const [showAvatar, setShowAvatar] = useState(true)
  const { setCurrentMessage } = messageContextmenuActions
  const messageId = 'msgId#' + item.id

  useEffect(() => {
    dispatch(setCurrentMessage(undefined))
    setFromSelf(item.sender.id === currentUser?.id ? true : false)

    ref.current!.scrollIntoView({ behavior: 'smooth' })

    window.onclick = () => {
      dispatch(setCurrentMessage(undefined))
    }
  }, [item])

  useEffect(() => {
    const nextMessage = messageList.find(
      (message) => message.id > item.id && message.delete == false
    )

    if (nextMessage !== undefined && nextMessage.sender.id === item.sender.id) {
      setShowAvatar(false)
    } else setShowAvatar(true)
  }, [messageList])

  useEffect(() => {
    if (currentMessage?.id === item.id) {
      ref.current!.classList.add('bg-slate-400')
    } else {
      ref.current!.classList.remove('bg-slate-400')
    }
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
      style={{ display: item.delete ? 'none' : 'block' }}
      className='transition-all w-full'
      onContextMenu={onContextMenu}
    >
      <div
        // style={{
        //   justifyContent: fromSelf ? 'flex-end' : 'flex-start',
        // }}
        className={`relative w-full px-5 md:w-2/3 mx-auto flex flex-row ${
          fromSelf ? 'justify-end' : 'justify-start'
        }`}
      >
        <div className='flex flex-col justify-end mr-3 py-1'>
          {showAvatar &&
          currentChat &&
          currentChat.type === ConversationTypeEnum.GROUP &&
          item.sender.id !== currentUser?.id ? (
            <UserAvatar
              name={item.sender.fullName}
              avatar={item.sender.avatar}
              size={AVATAR_SMALL}
            />
          ) : (
            <div style={{ width: AVATAR_SMALL_IMG_SIZE }}></div>
          )}
        </div>
        <div
          style={{
            justifyContent: fromSelf ? 'flex-end' : 'flex-start',
          }}
          className='relative w-3/4 flex flex-row py-1 '
        >
          <ClipPathMsg message={item} fromSelf={fromSelf} />
          <div
            style={{
              backgroundColor: fromSelf ? '#eeffde' : 'white',
              borderRadius:
                item.message === ''
                  ? fromSelf
                    ? '.85rem'
                    : '.85rem'
                  : fromSelf
                  ? '.85rem .85rem 0 .85rem'
                  : '.85rem .85rem .85rem 0',
            }}
            className='relative min-w-[20%]'
          >
            {item.delete ? (
              <></>
            ) : (
              <div className='flex flex-col justify-start sm:min-w-[50%] md:min-w-[40%] '>
                {item.isLoading ? (
                  <div className='w-full h-20 rounded-2xl bg-slate-400 flex justify-center items-center'>
                    <CircularProgress
                      color='info'
                      sx={{ width: '1rem', height: '1rem' }}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {item.attachmentResponseList?.map((attachment) => {
                  if (
                    getTypeOfAttachment(attachment) === AttachFileTypeEnum.IMAGE
                  )
                    return (
                      <img
                        key={attachment.id}
                        src={attachment.fileUrl}
                        className='rounded-2xl object-contain'
                      />
                    )
                  else {
                    return (
                      <div
                        key={attachment.id}
                        className='flex justify-start items-center p-3 rounded-2xl bg-slate-500'
                      >
                        <span className='text-white'>
                          <InsertDriveFileOutlined
                            sx={{ width: '2rem', height: '2rem' }}
                          />
                        </span>
                        <span className='ml-3 text-gray-100'>
                          {attachment.fileName}
                        </span>
                      </div>
                    )
                  }
                })}
              </div>
            )}
            {item.message !== '' ? (
              <p
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  textAlign: 'initial',
                  display: 'flow-root',
                  unicodeBidi: 'plaintext',
                  lineHeight: 1.3125,
                  paddingBottom: item.revoke ? 0 : '.85rem',
                  fontStyle: item.revoke ? 'italic' : 'normal',
                  color: item.revoke ? 'rgb(100,116,139)' : 'black',
                }}
                className='relative text-[.95rem] p-2 mb-1'
              >
                {item.revoke ? 'Tin nhắn đã thu hồi' : item.message}
              </p>
            ) : (
              <></>
            )}
            <span
              style={
                item.message === ''
                  ? {
                      backgroundColor: '#eeffde',
                      right: '.5rem',
                      bottom: '.5rem',
                      padding: '.1rem .2rem',
                      borderRadius: '.5rem',
                    }
                  : { backgroundColor: 'transparent' }
              }
              className='absolute bottom-0 right-0 flex justify-end items-center'
            >
              <span className='text-[.7rem] mr-1 text-slate-500'>
                {item.revoke ? '' : parseDate(item.createdAt)}
              </span>
              <span className='text-[.7rem] mr-1 text-green-500'>
                {!item.revoke ? (
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
    </div>
  )
}

export default Messages
