import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { addNewContact } from '../../redux/thunks/ContactThunk'
import {
  AddNewContactPayloadType,
  ContactType,
} from '../../redux/types/ContactTypes'
import {
  ParticipantRoleEnum,
  ParticipantStatusEnum,
  ParticipantType,
} from '../../redux/types/ParticipantTypes'
import { UserType } from '../../redux/types/UserTypes'
import { AppDispatch } from '../../redux_store'

export const createNewContact = (
  currentUser: UserType,
  userWannaAdd: UserType,
  addNewContactInLocal: ActionCreatorWithPayload<any, string>,
  dispatch: AppDispatch
): void => {
  dispatch(addNewContactInLocal(userWannaAdd))

  const payload: AddNewContactPayloadType = {
    fullName: userWannaAdd.fullName,
    isBlocked: false,
    phone: userWannaAdd.phone,
    createdAt: new Date().toISOString(),
    user: currentUser as UserType,
  }
  dispatch(addNewContact(payload))
}

export const findContactOnChangeField = (
  contactKeyword: string,
  contactsList: ContactType[]
) => {
  if (contactKeyword === '') return []

  let foundContacts: ContactType[] = []

  if (contactsList) {
    for (let contact of contactsList) {
      if (contact.fullName.includes(contactKeyword)) {
        const existingContact = foundContacts.find(
          (iterator) => iterator.id === contact.id
        )

        if (existingContact === undefined) foundContacts.push(contact)
      }
    }
  }

  return foundContacts
}

export const parseContactTypetoParticipantType = (
  contacts: ContactType[]
): ParticipantType[] => {
  if (contacts.length === 0) return []

  let parsed: ParticipantType[] = []

  for (let contact of contacts) {
    const currentTime = new Date()

    let participant: ParticipantType = {
      id: currentTime.getTime(),
      user: {
        id: currentTime.getTime(),
        avatar: contact.avatar as string,
        fullName: contact.fullName,
        phone: contact.phone,
      },
      createdAt: currentTime.toISOString(),
      nickName: contact.fullName,
      role: ParticipantRoleEnum.MEM,
      status: ParticipantStatusEnum.STABLE,
      updateAt: currentTime.toISOString(),
    }

    parsed.push(participant)
  }

  return parsed
}
