import { Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import axios from 'axios'
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
import { ParticipantType } from '../../../../../redux/types/ParticipantTypes'

const AddContactBar = () => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { contacts } = useAppSelector(contactState)
  const { addNewContactInLocal } = contactActions
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLDivElement>(null)
  const [targetPaticipant, setTargetPaticipant] =
    useState<ParticipantType | null>(null)

  useEffect(() => {
    if (currentChat && currentChat.type !== ConversationTypeEnum.GROUP) {
      const findContactPair = async () => {
        const targetPaticipant = getTeammateInSingleConversation(
          currentUser as UserType,
          currentChat as ConversationType
        )

        setTargetPaticipant(targetPaticipant)

        const formData = new FormData()
        formData.append('phone', targetPaticipant.user.phone)
        formData.append('userId', (currentUser as UserType).id.toString())

        try {
          await axios.post(API_CHECK_EXISTING_CONTACT, formData)

          ref.current!.style.display = 'flex'
        } catch (error) {
          ref.current!.style.display = 'none'
        }
      }

      findContactPair()
    } else {
      ref.current!.style.display = 'none'
    }
  }, [currentChat, contacts])

  const closeAddContactBar = () => {
    ref.current!.style.display = 'none'
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
          color: '#e82344',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: '#e82a49',
            color: 'white',
          },
        }}
        disableElevation
        onClick={closeAddContactBar}
      >
        <span>Chặn</span>
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
