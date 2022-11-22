import { Close } from '@mui/icons-material'
import { Button, Modal } from '@mui/material'
import {
  controlOverlaysActions,
  controlOverlaysState,
} from '../../../redux/slices/ControlOverlaysSlice'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import { useEffect, useRef, useState } from 'react'
import { conversationsControlState } from '../../../redux/slices/ConversationsControlSlice'
import UserAvatar from '../../core/UserAvatar'
import { AVATAR_BASE } from '../../../constants/UserAvatarConstant'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../redux/types/ConversationTypes'
import { authState } from '../../../redux/slices/AuthSlice'
import {
  findConversation,
  getTeammateInSingleConversation,
} from '../../../utilities/conversation/ConversationUtils'
import { UserType } from '../../../redux/types/UserTypes'
import {
  ForwardMessagePayloadType,
  MessageType,
} from '../../../redux/types/MessageTypes'
import {
  messageContextmenuActions,
  messageContextmenuState,
} from './../../../redux/slices/MessageContextmenuSlice'
import { showMessageHandlerResultToSnackbar } from '../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import { forwardOneMessage } from '../../../redux/thunks/MessageThunks'

const ForwardMessage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { setHandlerResult } = messageContextmenuActions
  const { conversationList, currentChat } = useAppSelector(
    conversationsControlState
  )
  const { inBackgroundMessage } = useAppSelector(messageContextmenuState)
  const { currentUser } = useAppSelector(authState)
  const { openForwardMessageOverlay } = useAppSelector(controlOverlaysState)
  const { toggleForwardMessageOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()
  const [foundResult, setFoundResult] = useState<
    ConversationType[] | undefined
  >(undefined)

  useEffect(() => {
    if (openForwardMessageOverlay) inputRef.current && inputRef.current.focus()
  }, [openForwardMessageOverlay])

  const onFindConverTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value

    setFoundResult(
      findConversation(value, currentUser as UserType, conversationList)
    )
  }

  const forwardMessageToConversation = async (item: ConversationType) => {
    dispatch(toggleForwardMessageOverlay())

    const payload: ForwardMessagePayloadType = {
      sender: currentUser as UserType,
      messageType: (inBackgroundMessage as MessageType).type,
      message: (inBackgroundMessage as MessageType).message,
      attachments: (inBackgroundMessage as MessageType).attachmentResponseList
        ? (inBackgroundMessage as MessageType).attachmentResponseList
        : [],
      converId: item.id,
    }

    dispatch(forwardOneMessage(payload))

    showMessageHandlerResultToSnackbar(
      true,
      'Đã chuyển tiếp tin nhắn',
      dispatch,
      setHandlerResult
    )
  }

  return (
    <Modal
      open={openForwardMessageOverlay}
      onClose={() => {
        dispatch(toggleForwardMessageOverlay())
      }}
    >
      <div
        className='w-5/6 max-h-[90vh] overflow-y-auto md:w-1/3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
        flex flex-col p-5 rounded-md bg-white'
      >
        <div className='flex-initial flex justify-start items-center pb-5'>
          <Button
            variant='contained'
            sx={{
              maxWidth: '2.8rem',
              maxHeight: '2.8rem',
              minWidth: '2.8rem',
              minHeight: '2.8rem',
              borderRadius: '50%',
              mr: 1,
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: '#d4d4d4',
              },
            }}
            disableElevation
            onClick={() => {
              dispatch(toggleForwardMessageOverlay())
            }}
          >
            <Close sx={{ fill: 'gray', width: '1.8rem', height: '1.8rem' }} />
          </Button>
          <input
            ref={inputRef}
            autoFocus
            type='text'
            name='target'
            className='w-full py-2 text-lg outline-none'
            placeholder='Chuyển tiếp đến...'
            onChange={onFindConverTextFieldChange}
          />
        </div>
        <div className='flex-auto max-h-56 overflow-y-scroll'>
          {(foundResult === undefined || foundResult.length === 0
            ? conversationList
            : foundResult
          ).map((item) => {
            if (item.id === (currentChat as ConversationType).id)
              return <div key={item.id} className='hidden'></div>

            const teammate =
              item.type === ConversationTypeEnum.SINGLE
                ? getTeammateInSingleConversation(currentUser as UserType, item)
                    .user
                : undefined

            return (
              <div
                key={item.id}
                onClick={() => {
                  forwardMessageToConversation(item)
                }}
                className='w-full flex justify-start items-center p-2 rounded-xl transition-all hover:bg-slate-300 cursor-pointer'
              >
                <UserAvatar
                  size={AVATAR_BASE}
                  avatar={
                    item.type === ConversationTypeEnum.GROUP
                      ? item.avatar
                      : (teammate as UserType).avatar
                  }
                  name={
                    item.type === ConversationTypeEnum.GROUP
                      ? item.title
                      : (teammate as UserType).fullName
                  }
                />
                <div className='flex flex-col justify-start ml-3'>
                  <span>
                    {item.type === ConversationTypeEnum.GROUP
                      ? item.title
                      : teammate?.fullName}
                  </span>
                  <span>
                    {item.type === ConversationTypeEnum.GROUP
                      ? item.participantResponse.length + ' thành viên'
                      : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default ForwardMessage
