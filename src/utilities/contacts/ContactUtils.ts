import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { addNewContact } from '../../redux/thunks/ContactThunk'
import { AddNewContactPayloadType } from '../../redux/types/ContactTypes'
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
