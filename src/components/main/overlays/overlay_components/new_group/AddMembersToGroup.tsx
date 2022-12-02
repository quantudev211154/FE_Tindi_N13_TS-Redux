import { Search } from '@mui/icons-material'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { authState } from '../../../../../redux/slices/AuthSlice'
import { contactState } from '../../../../../redux/slices/ContactSlice'
import { controlOverlaysActions } from '../../../../../redux/slices/ControlOverlaysSlice'
import { conversationDetailActions } from '../../../../../redux/slices/ConversationDetailSlice'
import { responsiveActions } from '../../../../../redux/slices/Responsive'
import { ContactType } from '../../../../../redux/types/ContactTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { findContactOnChangeField } from '../../../../../utilities/contacts/ContactUtils'
import { createNewGroup } from '../../../../../utilities/conversation/ConversationUtils'
import ContactToAdd from './ContactToAdd'

type Props = {
  groupName: string
  backToNewGroupOverlay: Function
}

const AddMembersToGroup = ({ groupName, backToNewGroupOverlay }: Props) => {
  const { contacts } = useAppSelector(contactState)
  const [foundContactResult, setFoundContactResult] = useState<ContactType[]>(
    []
  )
  const [addedMembers, setAddedMembers] = useState<ContactType[]>([])
  const { toggleNewGroupOverlay } = controlOverlaysActions
  const { clearMessageList } = conversationDetailActions
  const { currentUser } = useAppSelector(authState)
  const dispatch = useAppDispatch()
  const { openMessageList } = responsiveActions

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
    const result = addedMembers.find((iterator) => iterator.id === contact.id)

    return result === undefined ? false : true
  }

  const modifyMemberStateOfContact = (contact: ContactType) => {
    const preCondition = isContactAddedToGroupMember(contact)

    if (preCondition === false) {
      setAddedMembers([...addedMembers, contact])
    } else {
      setAddedMembers(
        addedMembers.filter((iterator) => iterator.id !== contact.id)
      )
    }
  }

  return (
    <div className='w-full p-3'>
      <div className='mb-3 flex justify-between items-center text-center'>
        <p className='font-bold text-2xl text-black'>Thêm thành viên</p>
        <p className='mt-1 text-sm font-medium text-slate-600'>
          <span>{addedMembers.length}</span>
          <span>/500</span>
        </p>
      </div>
      <div className='w-full mb-3'>
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
      <div className='w-full max-h-60 overflow-y-scroll'>
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
      <div className='mt-3 w-full flex justify-end items-center'>
        <Button
          disableElevation
          onClick={() => {
            backToNewGroupOverlay()
          }}
          variant='contained'
          sx={{
            textTransform: 'none',
            bgcolor: 'transparent',
            color: '#185a94',
            mr: 1,
            '&:hover': { bgcolor: '#cc2f54', color: 'white' },
          }}
        >
          Huỷ
        </Button>
        <Button
          disabled={addedMembers.length >= 2 ? false : true}
          onClick={() => {
            let timer = -1

            if (addedMembers.length >= 2) {
              createNewGroup(
                dispatch,
                toggleNewGroupOverlay,
                groupName,
                currentUser as UserType,
                addedMembers,
                clearMessageList
              )

              timer = window.setTimeout(() => {
                dispatch(openMessageList(true))
              }, 1000)
            }

            return () => window.clearTimeout(timer)
          }}
          disableElevation
          variant='contained'
          sx={{
            textTransform: 'none',
            bgcolor: 'transparent',
            color: '#185a94',
            '&:hover': { bgcolor: '#1472c4', color: 'white' },
          }}
        >
          Tạo nhóm
        </Button>
      </div>
    </div>
  )
}

export default AddMembersToGroup
