import { Close } from '@mui/icons-material'
import { Button, Modal } from '@mui/material'
import {
  controlOverlaysActions,
  controlOverlaysState,
} from '../../../redux/slices/ControlOverlaysSlice'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import { useEffect, useRef } from 'react'
import { conversationsControlState } from '../../../redux/slices/ConversationsControlSlice'
import UserAvatar from '../../core/UserAvatar'
import { AVATAR_BASE } from '../../../constants/UserAvatarConstant'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../redux/types/ConversationTypes'
import { authState } from '../../../redux/slices/AuthSlice'
import { getTeammateInSingleConversation } from '../../../utilities/conversation/ConversationUtils'
import { UserType } from '../../../redux/types/UserTypes'
import {
  AttachmentType,
  MessageStatusEnum,
  MessageType,
} from '../../../redux/types/MessageTypes'
import {
  messageContextmenuActions,
  messageContextmenuState,
} from './../../../redux/slices/MessageContextmenuSlice'
import { nanoid } from '@reduxjs/toolkit'
import { showMessageHandlerResultToSnackbar } from '../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import axios from 'axios'

const ForwardMessage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { setHandlerResult } = messageContextmenuActions
  const { currentChat } = useAppSelector(conversationsControlState)
  const { inBackgroundMessage } = useAppSelector(messageContextmenuState)
  const { currentUser } = useAppSelector(authState)
  const { openForwardMessageOverlay } = useAppSelector(controlOverlaysState)
  const { conversationList } = useAppSelector(conversationsControlState)
  const { toggleForwardMessageOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (openForwardMessageOverlay) inputRef.current && inputRef.current!.focus()
  }, [openForwardMessageOverlay])

  const forwardMessageToConversation = async (item: ConversationType) => {
    // const forwardMessage: MessageType = {
    //   conversation: item,
    //   createdAt: new Date().toISOString(),
    //   delete: false,
    //   id: nanoid(),
    //   message: (inBackgroundMessage as MessageType).message,
    //   sender: ,
    //   status: MessageStatusEnum.SENDING,
    //   type: (inBackgroundMessage as MessageType).type,
    //   attachmentResponseList: (inBackgroundMessage as MessageType).attachmentResponseList
    // }

    const formData = new FormData()
    formData.append('conversationId', item.id.toString())
    formData.append('senderId', (currentUser as UserType).id.toString())
    formData.append(
      'messageType',
      (inBackgroundMessage as MessageType).type.toString()
    )
    formData.append('message', (inBackgroundMessage as MessageType).message)

    // if ((inBackgroundMessage as MessageType).attachmentResponseList) {
    //   for (const iterator of (inBackgroundMessage as MessageType)
    //     .attachmentResponseList as AttachmentType[])
    //     formData.append('file', iterator)
    // }

    // await axios.post

    showMessageHandlerResultToSnackbar(
      true,
      'Đã chuyển tiếp tin nhắn',
      dispatch,
      setHandlerResult
    )

    dispatch(toggleForwardMessageOverlay())
  }

  return (
    <Modal
      open={openForwardMessageOverlay}
      onClose={() => {
        dispatch(toggleForwardMessageOverlay())
      }}
    >
      <div
        className='w-1/3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
        flex flex-col p-5 rounded-md bg-white'
      >
        <div className='flex-initial flex justify-start items-center'>
          <Button
            variant='contained'
            sx={{
              maxWidth: '3rem',
              maxHeight: '3rem',
              minWidth: '3rem',
              minHeight: '3rem',
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
            placeholder='Chuyển tiếp đến'
          />
        </div>
        <div className='flex-auto max-h-56 overflow-y-scroll'>
          {conversationList.map((item) => {
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
