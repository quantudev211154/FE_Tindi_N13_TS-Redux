import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  API_ADD_CONVER,
  API_ADD_MEMBERS_TO_CONVERSATION,
  API_DELETE_CONVER,
  API_GRANT_PERMISSION,
  API_LOAD_CONVERS,
  API_OUT_GROUP,
  API_REMOVE_MEMBER,
  API_UPDATE_CONVER,
  API_UPDATE_STATUS_OF_MEMBER,
} from '../../constants/APIConstant'
import {
  CONVERSATION_ADD_MEMBER,
  CONVERSATION_ADD_NEW_CONVER,
  CONVERSATION_DELETE_CONVER,
  CONVERSATION_GRANT_PERMISSION,
  CONVERSATION_LOAD_CONVERS_THUNK,
  CONVERSATION_OUT_GROUP,
  CONVERSATION_REMOVE_MEMBER,
  CONVERSATION_UPDATE_CONVER,
  CONVERSATION_UPDATE_STATUS_OF_MEMBER,
} from '../../constants/ReduxConstant'
import { MySocket } from '../../services/TindiSocket'
import http from '../../utilities/http/Http'
import { createRandomHEXColor } from '../../utilities/random_color_creator/CreateRandomHEXColor'
import {
  AddMultiMemberPayloadType,
  AddMultiMemberReturnType,
  AddMultiMemberServerPayloadType,
  AddNewConversationPayloadType,
  ConversationType,
  GrantPermissionPayloadType,
  RemoveMemberPayload,
  UpdateConversationPayloadType,
  UpdateStatusOfParticipantPayloadType,
} from '../types/ConversationTypes'
import { ErrorType } from '../types/ErrorType'
import {
  ParticipantStatusEnum,
  ParticipantType,
} from '../types/ParticipantTypes'
import { UserRoleEnum, UserStatusEnum } from '../types/UserTypes'

export const loadConversations = createAsyncThunk<
  any,
  number,
  { rejectValue: ErrorType }
>(CONVERSATION_LOAD_CONVERS_THUNK, async (payload: number, thunkApi) => {
  try {
    const response = await http.get(`${API_LOAD_CONVERS}/${payload}`)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const addNewConversation = createAsyncThunk<
  ConversationType,
  AddNewConversationPayloadType,
  { rejectValue: ErrorType }
>(CONVERSATION_ADD_NEW_CONVER, async (payload, thunkApi) => {
  try {
    const response = await http.post(API_ADD_CONVER, payload)

    const newConver = response.data as ConversationType

    const currentUsers = newConver.participantResponse.map(
      (parti) => parti.user
    )
    MySocket.createNewConversation(currentUsers, newConver)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const updateConversationAvatarAndTitle = createAsyncThunk<
  ConversationType,
  UpdateConversationPayloadType,
  { rejectValue: ErrorType }
>(CONVERSATION_UPDATE_CONVER, async (payload, thunkApi) => {
  try {
    const response = await http.post(
      API_UPDATE_CONVER + payload.conversationId,
      payload.formData
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const deleteConversation = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType }
>(CONVERSATION_DELETE_CONVER, async (payload, thunkApi) => {
  try {
    await http.delete(API_DELETE_CONVER + payload)

    return payload
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const addMultiParticipantToConversation = createAsyncThunk<
  AddMultiMemberReturnType,
  AddMultiMemberPayloadType,
  { rejectValue: ErrorType }
>(CONVERSATION_ADD_MEMBER, async (payload, thunkApi) => {
  try {
    const response = await http.post(
      API_ADD_MEMBERS_TO_CONVERSATION,
      payload as AddMultiMemberServerPayloadType
    )

    let newParticipants: ParticipantType[] = []

    for (let iterator of response.data) {
      let parti: ParticipantType = {
        id: iterator.id,
        createdAt: iterator.createdAt,
        nickName: !iterator.nickName
          ? iterator.user.fullName
          : iterator.nickName,
        role: iterator.role,
        status: !iterator.status
          ? ParticipantStatusEnum.STABLE
          : iterator.status,
        updateAt: !iterator.updateAt ? iterator.createdAt : iterator.updateAt,
        user: {
          id: iterator.user.id,
          avatar: !iterator.user.avatar
            ? createRandomHEXColor()
            : iterator.user.avatar,
          fullName: iterator.user.fullName,
          phone: iterator.user.phone,
          createdAt: iterator.user.createdAt,
          email: '',
          password: '',
          role: UserRoleEnum.USER,
          status: UserStatusEnum.ACTIVE,
          tokenVersion: -1,
          updateAt: new Date().toISOString(),
        },
      }

      newParticipants.push(parti)
    }

    const currentUsers = payload.conversation.participantResponse.map(
      (participant) => participant.user
    )
    const newUsers = newParticipants.map((parti) => parti.user)

    MySocket.addMoreMembersToGroup(payload.conversation, newParticipants, [
      ...currentUsers,
      ...newUsers,
    ])

    return {
      converId: payload.conversationId,
      newParticipants,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const removeParticipant = createAsyncThunk<
  number,
  RemoveMemberPayload,
  { rejectValue: ErrorType }
>(CONVERSATION_REMOVE_MEMBER, async (payload, thunkApi) => {
  try {
    await http.post(
      `${API_REMOVE_MEMBER}?adminId=${payload.adminId}&participantId=${payload.participantId}`
    )

    return payload.participantId
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const outGroupConversation = createAsyncThunk<
  number,
  number,
  { rejectValue: ErrorType }
>(CONVERSATION_OUT_GROUP, async (payload, thunkApi) => {
  try {
    await http.delete(API_OUT_GROUP + payload)

    return payload
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const grantPermission = createAsyncThunk<
  ParticipantType,
  GrantPermissionPayloadType,
  { rejectValue: ErrorType }
>(CONVERSATION_GRANT_PERMISSION, async (payload, thunkApi) => {
  try {
    const response = await http.post(
      `${API_GRANT_PERMISSION}?adminId=${payload.adminId}&participantId=${payload.participantId}&role=${payload.role}`
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const updateStatusOfParticipant = createAsyncThunk<
  ParticipantType,
  UpdateStatusOfParticipantPayloadType,
  { rejectValue: ErrorType }
>(CONVERSATION_UPDATE_STATUS_OF_MEMBER, async (payload, thunkApi) => {
  try {
    const response = await http.put<ParticipantType>(
      `${API_UPDATE_STATUS_OF_MEMBER}?adminId=${payload.adminId}&participantId=${payload.participantId}&status=${payload.status}`
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})
