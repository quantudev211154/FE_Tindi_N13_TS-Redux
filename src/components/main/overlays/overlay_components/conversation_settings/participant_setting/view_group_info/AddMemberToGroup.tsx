import { Search } from '@mui/icons-material'
import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { contactState } from '../../../../../../../redux/slices/ContactSlice'
import { messageContextmenuActions } from '../../../../../../../redux/slices/MessageContextmenuSlice'
import { addMultiParticipantToConversation } from '../../../../../../../redux/thunks/ConversationThunks'
import { ContactType } from '../../../../../../../redux/types/ContactTypes'
import { AddMultiMemberPayloadType } from '../../../../../../../redux/types/ConversationTypes'
import {
  ParticipantStatusEnum,
  ParticipantType,
} from '../../../../../../../redux/types/ParticipantTypes'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'
import { findContactOnChangeField } from '../../../../../../../utilities/contacts/ContactUtils'
import { isContactExistingInCurrentChatParticipant } from '../../../../../../../utilities/conversation/ConversationUtils'
import { showMessageHandlerResultToSnackbar } from '../../../../../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import { CurrentViewGroupOverlayEnum } from '../../../../ViewGroupInfoOverlay'
import ContactToAdd from '../../../new_group/ContactToAdd'
import { conversationsControlState } from './../../../../../../../redux/slices/ConversationsControlSlice'

type Props = {
  changeOverlay: Function
}

const AddMemberToGroup = ({ changeOverlay }: Props) => {
  const { currentChat } = useAppSelector(conversationsControlState)
  const { contacts } = useAppSelector(contactState)
  const [newMembers, setNewMembers] = useState<ContactType[]>([])
  const [foundContactResult, setFoundContactResult] = useState<ContactType[]>(
    []
  )
  const dispatch = useAppDispatch()
  const { setHandlerResult } = messageContextmenuActions

  const onFindContactFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (contacts) {
      setFoundContactResult(
        findContactOnChangeField(event.target.value, contacts)
      )
    }
  }

  const isContactAddedToGroupMember = (contact: ContactType) => {
    if (
      isContactExistingInCurrentChatParticipant(
        contact,
        currentChat?.participantResponse as ParticipantType[]
      )
    ) {
      return true
    }

    const result = newMembers.find((iterator) => iterator.id === contact.id)

    return result === undefined ? false : true
  }

  const modifyMemberStateOfContact = (contact: ContactType) => {
    const preCondition = isContactAddedToGroupMember(contact)

    if (preCondition === false) {
      setNewMembers([...newMembers, contact])
    } else {
      if (
        !isContactExistingInCurrentChatParticipant(
          contact,
          currentChat?.participantResponse as ParticipantType[]
        )
      ) {
        setNewMembers(
          newMembers.filter((iterator) => iterator.id !== contact.id)
        )
      }
    }
  }

  const addNewMembers = () => {
    if (currentChat) {
      const phones = newMembers.map((member) => member.phone)

      const payload: AddMultiMemberPayloadType = {
        conversationId: currentChat.id,
        conversation: currentChat,
        createdAt: new Date().toISOString(),
        status: ParticipantStatusEnum.STABLE,
        phones,
      }
      dispatch(addMultiParticipantToConversation(payload))
      changeOverlay(CurrentViewGroupOverlayEnum.DEFAULT)

      showMessageHandlerResultToSnackbar(
        true,
        'Đã thêm thành công ' + phones.length + ' thành viên mới vào nhóm',
        dispatch,
        setHandlerResult
      )
    }
  }

  const onBackToViewGroupOverlay = () => {
    changeOverlay(CurrentViewGroupOverlayEnum.DEFAULT)
  }

  const onAddNewMembersToGroup = () => {
    addNewMembers()
  }

  return (
    <div className='w-full bg-white rounded-2xl'>
      <div className='flex justify-start items-center px-5 py-3'>
        <span className='font-medium text-xl text-slate-800'>
          Thêm thành viên vào nhóm
        </span>
        <span className='text-slate-700 ml-5 text-sm'>
          <span>{currentChat && currentChat.participantResponse.length}</span>
          <span> / 500</span>
        </span>
      </div>
      <div className='w-full px-5 pt-1 pb-3'>
        <TextField
          autoFocus
          fullWidth
          variant='standard'
          placeholder='Bạn muốn thêm ai vào nhóm?'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={onFindContactFieldChange}
        />
      </div>
      <div className='w-full px-5 py-3 max-h-72 overflow-y-scroll'>
        {foundContactResult.length !== 0 &&
          foundContactResult.map((iterator) => (
            <ContactToAdd
              key={iterator.id}
              isChecked={isContactAddedToGroupMember(iterator)}
              onClick={() => {
                modifyMemberStateOfContact(iterator)
              }}
              contact={iterator}
            />
          ))}
        {foundContactResult.length === 0 &&
          contacts &&
          contacts.map((contact) => (
            <ContactToAdd
              key={contact.id}
              isChecked={isContactAddedToGroupMember(contact)}
              onClick={() => {
                modifyMemberStateOfContact(contact)
              }}
              contact={contact}
            />
          ))}
      </div>
      <div className='w-full flex justify-end items-center px-5 py-3'>
        <Button
          disableElevation
          onClick={onBackToViewGroupOverlay}
          variant='contained'
          sx={{
            textTransform: 'none',
            bgcolor: 'transparent',
            color: '#185a94',
            '&:hover': { bgcolor: '#cc2f54', color: 'white' },
          }}
        >
          Huỷ
        </Button>
        <Button
          disabled={newMembers.length > 0 ? false : true}
          onClick={onAddNewMembersToGroup}
          disableElevation
          variant='contained'
          sx={{
            textTransform: 'none',
            bgcolor: 'transparent',
            color: '#185a94',
            '&:hover': { bgcolor: '#1472c4', color: 'white' },
          }}
        >
          Thêm vào nhóm
        </Button>
      </div>
    </div>
  )
}

export default AddMemberToGroup
