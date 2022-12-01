import {
  DoneAll,
  DoneOutlined,
  InsertDriveFileOutlined,
} from '@mui/icons-material'
import { useEffect, useRef } from 'react'
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
import {
  messageContextmenuActions,
  messageContextmenuState,
} from '../../../../../../../redux/slices/MessageContextmenuSlice'
import {
  findNextMessage,
  getTypeOfAttachment,
} from '../../../../../../../utilities/message_utils/MessageUtils'
import { CircularProgress } from '@mui/material'
import { ConversationTypeEnum } from '../../../../../../../redux/types/ConversationTypes'
import UserAvatar from '../../../../../../core/UserAvatar'
import {
  AVATAR_SMALL,
  AVATAR_SMALL_IMG_SIZE,
} from '../../../../../../../constants/UserAvatarConstant'
import { conversationDetailState } from '../../../../../../../redux/slices/ConversationDetailSlice'
import ReplyMessage from './ReplyMessage'
import { parseDateByHourAndMinutes } from '../../../../../../../utilities/date_utils/ParseDate'
import DateDivider from './DateDivider'
import { fileViewerActions } from '../../../../../../../redux/slices/FileViewerSlice'

type Props = {
  item: MessageType
}

const Messages = ({ item }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { messageList } = useAppSelector(conversationDetailState)
  const containerRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const { currentMessage } = useAppSelector(messageContextmenuState)
  const { setCurrentMessage } = messageContextmenuActions
  const avatarRef = useRef<HTMLDivElement>(null)
  const clipPathRef = useRef<HTMLDivElement>(null)
  const { setCurrentAttachment: setCurrentFileUrl } = fileViewerActions

  const updateOpacityOfAvatar = () => {
    if (
      avatarRef.current &&
      findNextMessage(item, messageList)?.sender.id === item.sender.id
    ) {
      avatarRef.current.style.visibility = 'hidden'

      if (item.sender.id !== currentUser?.id && clipPathRef.current) {
        clipPathRef.current.style.visibility = 'hidden'
      }
    }
  }

  useEffect(() => {
    dispatch(setCurrentMessage(undefined))

    if (containerRef.current) {
      containerRef.current.scrollIntoView()
    }

    window.onclick = () => {
      dispatch(setCurrentMessage(undefined))
    }
  }, [item])

  useEffect(() => {
    updateOpacityOfAvatar()
  }, [messageList])

  useEffect(() => {
    if (currentMessage?.id === item.id && !currentMessage.delete) {
      containerRef.current!.classList.add('bg-slate-400')
    } else {
      containerRef.current!.classList.remove('bg-slate-400')
    }
  }, [currentMessage])

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()

    dispatch(setCurrentMessage(item))
  }

  return (
    <>
      <DateDivider item={item} />
      <div
        id={`msg#${item.id}`}
        ref={containerRef}
        style={{
          display:
            currentUser &&
            !!item.participantDeleted.find(
              (parti) => parti.user.id === currentUser.id
            )
              ? 'none'
              : 'block',
        }}
        className='msg-container transition-all'
        onContextMenu={onContextMenu}
      >
        <div
          className={`container-content relative w-full md:w-3/4 sm:px-3 px-5 md:px-0 md:mx-auto flex flex-row ${
            item.sender.id === currentUser?.id ? 'justify-end' : 'justify-start'
          }`}
        >
          <div className='flex flex-col justify-end mr-3 py-1'>
            {currentChat &&
            currentChat.type === ConversationTypeEnum.GROUP &&
            item.sender.id !== currentUser?.id ? (
              <div ref={avatarRef}>
                <UserAvatar
                  name={item.sender.fullName}
                  avatar={item.sender.avatar}
                  size={AVATAR_SMALL}
                />
              </div>
            ) : (
              <div style={{ width: AVATAR_SMALL_IMG_SIZE }}></div>
            )}
          </div>
          <div
            style={{
              justifyContent:
                item.sender.id === currentUser?.id ? 'flex-end' : 'flex-start',
            }}
            className='relative w-3/4 flex flex-row py-1 '
          >
            <ClipPathMsg
              message={item}
              fromSelf={item.sender.id === currentUser?.id}
              clipPathRef={clipPathRef}
            />
            <div
              style={{
                backgroundColor:
                  item.sender.id === currentUser?.id ? '#eeffde' : 'white',
                borderRadius:
                  item.message === ''
                    ? item.sender.id === currentUser?.id
                      ? '.85rem'
                      : '.85rem'
                    : item.sender.id === currentUser?.id
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
                      getTypeOfAttachment(attachment) ===
                      AttachFileTypeEnum.IMAGE
                    )
                      return (
                        <img
                          key={attachment.id}
                          src={attachment.fileUrl}
                          className='rounded-2xl object-contain cursor-pointer'
                          onClick={() => {
                            dispatch(setCurrentFileUrl(attachment))
                          }}
                        />
                      )
                    else {
                      return (
                        <div
                          key={attachment.id}
                          className={`flex justify-start items-center p-3 rounded-2xl bg-slate-500 ${
                            item.message === '' ? 'pb-7' : 'pb-3'
                          }`}
                          onClick={() => {
                            dispatch(setCurrentFileUrl(attachment))
                          }}
                        >
                          <span className='text-white'>
                            <InsertDriveFileOutlined
                              sx={{ width: '2rem', height: '2rem' }}
                            />
                          </span>
                          <span className='ml-3 text-gray-100 whitespace-pre-wrap overflow-hidden text-ellipsis break-all'>
                            {attachment.thumbnail}
                          </span>
                        </div>
                      )
                    }
                  })}
                </div>
              )}
              {item.message !== '' ? (
                <div className='flex flex-col w-full'>
                  <ReplyMessage replyMessage={item} />
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
                    className='relative text-[.95rem] p-2 mb-1'
                  >
                    {item.delete ? 'Tin nhắn đã thu hồi' : item.message}
                  </p>
                </div>
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
                  {item.delete ? '' : parseDateByHourAndMinutes(item.createdAt)}
                </span>
                <span className='text-[.7rem] mr-1 text-green-500'>
                  {!item.delete ? (
                    item.status === MessageStatusEnum.SENT ? (
                      <DoneAll sx={{ width: '1.2rem', height: '1.2rem' }} />
                    ) : (
                      <DoneOutlined
                        sx={{ width: '1.2rem', height: '1.2rem' }}
                      />
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
    </>
  )
}

export default Messages
