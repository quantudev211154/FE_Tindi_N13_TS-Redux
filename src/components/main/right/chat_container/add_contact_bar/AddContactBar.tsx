import { Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { API_CHECK_EXISTING_CONTACT } from '../../../../../constants/APIConstant'
import { authState } from '../../../../../redux/slices/AuthSlice'
import {
  contactActions,
  contactState,
} from '../../../../../redux/slices/ContactSlice'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../../../redux/types/ConversationTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { createNewContact } from '../../../../../utilities/contacts/ContactUtils'
import { getTeammateInSingleConversation } from '../../../../../utilities/conversation/ConversationUtils'
import {
  ParticipantStatusEnum,
  ParticipantType,
} from '../../../../../redux/types/ParticipantTypes'
import http from '../../../../../utilities/http/Http'
import { MySocket } from '../../../../../services/TindiSocket'
import { showMessageHandlerResultToSnackbar } from '../../../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import { updateStatusOfParticipant } from '../../../../../redux/thunks/ConversationThunks'
import { messageContextmenuActions } from '../../../../../redux/slices/MessageContextmenuSlice'

const AddContactBar = () => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { contacts } = useAppSelector(contactState)
  const { addNewContactInLocal } = contactActions
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const [targetPaticipant, setTargetPaticipant] =
    useState<ParticipantType | null>(null)
  const { setHandlerResult } = messageContextmenuActions
  const [teammate, setTeammate] = useState<ParticipantType | null>(null)

  useEffect(() => {
    if (currentUser && currentChat) {
      setTeammate(getTeammateInSingleConversation(currentUser, currentChat))
    }
  }, [currentChat, currentUser])

  useEffect(() => {
    if (currentChat && currentChat.type !== ConversationTypeEnum.GROUP) {
      const targetPaticipant = getTeammateInSingleConversation(
        currentUser as UserType,
        currentChat as ConversationType
      )

      const existingContact = contacts?.find(
        (contact) => contact.phone === targetPaticipant.user.phone
      )

      if (!!existingContact) {
        ref.current!.style.display = 'none'
        return
      }

      const findContactPair = async () => {
        setTargetPaticipant(targetPaticipant)

        const formData = new FormData()
        formData.append('phone', targetPaticipant.user.phone)
        formData.append('userId', (currentUser as UserType).id.toString())

        try {
          await http.post(API_CHECK_EXISTING_CONTACT, formData)

          ref.current!.style.display = 'flex'
        } catch (error) {
          ref.current!.style.display = 'none'
        }
      }

      findContactPair()
    } else {
      ref.current!.style.display = 'none'
    }
  }, [currentChat])

  const closeAddContactBar = () => {
    ref.current!.style.display = 'none'
  }

  const updateStatusForUser = () => {
    if (currentUser && currentChat) {
      const participant = getTeammateInSingleConversation(
        currentUser,
        currentChat
      )

      if (!!participant) {
        const admin = currentChat.participantResponse.find(
          (parti) => parti.user.id === currentUser.id
        )

        if (!!admin) {
          const status =
            participant.status === ParticipantStatusEnum.MUTED
              ? ParticipantStatusEnum.STABLE
              : ParticipantStatusEnum.MUTED

          MySocket.changeStatusForParticipant(
            participant.user,
            currentChat,
            status
          )

          showMessageHandlerResultToSnackbar(
            participant.status === ParticipantStatusEnum.MUTED ? true : false,
            `Đã ${
              participant.status === ParticipantStatusEnum.MUTED
                ? 'bỏ chặn'
                : 'chặn'
            } người dùng ${participant.user.fullName}`,
            dispatch,
            setHandlerResult
          )

          dispatch(
            updateStatusOfParticipant({
              adminId: admin.id,
              participantId: participant.id,
              status,
            })
          )
        }
      }
    }
  }

  return (
    <div
      ref={ref}
      className='w-full bg-white px-8 py-2 flex items-center justify-between shadow-md z-20 transition-all'
    >
      <Button
        variant='contained'
        fullWidth={true}
        sx={{
          bgcolor: 'white',
          color: '#1670c4',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: '#e6f0fa',
          },
        }}
        disableElevation
        onClick={() => {
          createNewContact(
            currentUser as UserType,
            (targetPaticipant as ParticipantType).user as UserType,
            addNewContactInLocal,
            dispatch
          )
          closeAddContactBar()
        }}
      >
        <span>Thêm liên hệ mới</span>
      </Button>
      <Button
        variant='contained'
        fullWidth={true}
        sx={{
          bgcolor: 'white',
          color:
            teammate && teammate.status === ParticipantStatusEnum.MUTED
              ? '#1670c4'
              : '#e82344',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor:
              teammate && teammate.status === ParticipantStatusEnum.MUTED
                ? '#e6f0fa'
                : '#e82a49',
            color: 'white',
          },
        }}
        disableElevation
        onClick={() => {
          updateStatusForUser()
          closeAddContactBar()
        }}
      >
        {teammate && teammate.status === ParticipantStatusEnum.MUTED ? (
          <span>Bỏ chặn</span>
        ) : (
          <span>Chặn</span>
        )}
      </Button>
      <Button
        variant='contained'
        sx={{
          maxWidth: '2.5rem',
          maxHeight: '2.5rem',
          minWidth: '2.5rem',
          minHeight: '2.5rem',
          borderRadius: '50%',
          ml: 2,
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: '#eeeee4',
          },
        }}
        disableElevation
        onClick={closeAddContactBar}
      >
        <Close sx={{ fill: 'gray', width: 26, height: 26 }} />
      </Button>
    </div>
  )
}

export default AddContactBar
