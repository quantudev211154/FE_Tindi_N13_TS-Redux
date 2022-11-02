import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { API_GET_USER_BY_PHONE } from '../../constants/APIConstant'
import { addNewConversation } from '../../redux/thunks/ConversationThunks'
import { ContactType } from '../../redux/types/ContactTypes'
import {
  AddNewConversationPayloadType,
  ConversationType,
  ConversationTypeEnum,
} from '../../redux/types/ConversationTypes'
import { ParticipantType } from '../../redux/types/ParticipantTypes'
import { UserType } from '../../redux/types/UserTypes'
import { AppDispatch } from '../../redux_store'
import { randomBgrColorForAvatar } from '../user_avatar/creatingAvatarProps'

export const checkExistingSingleConversation = (
  userId1: number,
  userId2: number,
  conversationList: ConversationType[]
): ConversationType | null => {
  for (const item of conversationList) {
    if (item.type === ConversationTypeEnum.SINGLE) {
      const participantResponse = item.participantResponse

      const usersIdToString: string =
        participantResponse[0].user.id + '-' + participantResponse[1].user.id

      if (
        usersIdToString.includes(userId1.toString()) &&
        usersIdToString.includes(userId2.toString())
      )
        return item
    } else continue
  }

  return null
}

export const createNewConversation = async (
  currentUser: UserType,
  contact: ContactType,
  conversationList: ConversationType[],
  dispatch: AppDispatch,
  changeCurrentChat: ActionCreatorWithPayload<ConversationType, string>,
  toggleContactOverlay: ActionCreatorWithoutPayload<string>
) => {
  const response = await axios.get(API_GET_USER_BY_PHONE + contact.phone)

  const existingConver = checkExistingSingleConversation(
    currentUser?.id as number,
    (response.data as UserType).id,
    conversationList
  )

  if (existingConver != null) {
    dispatch(changeCurrentChat(existingConver))
  } else {
    try {
      const payload: AddNewConversationPayloadType = {
        title: contact.fullName,
        avatar: randomBgrColorForAvatar(),
        user: currentUser as UserType,
        usersId: [currentUser?.id as number, (response.data as UserType).id],
      }
      dispatch(addNewConversation(payload))
    } catch (error) {}
  }

  dispatch(toggleContactOverlay())
}

export const getTeammateInSingleConversation = (
  currentUser: UserType,
  conversation: ConversationType
): ParticipantType => {
  const teammate = conversation?.participantResponse.find(
    (item) => item.user.id !== currentUser?.id
  )

  return teammate as ParticipantType
}
