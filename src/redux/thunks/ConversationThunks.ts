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
} from '../../constants/ReduxConstant'
import { MySocket } from '../../services/TindiSocket'
import http from '../../utilities/http/Http'
import {
  AddMultiMemberPayloadType,
  AddMultiMemberReturnType,
  AddMultiMemberServerPayloadType,
  AddNewConversationPayloadType,
  ConversationType,
  GranPermissionPayloadType,
  RemoveMemberPayload,
  UpdateConversationPayloadType,
} from '../types/ConversationTypes'
import { ErrorType } from '../types/ErrorType'
import { ParticipantType } from '../types/ParticipantTypes'

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
    const response = await http.delete(API_DELETE_CONVER + payload)

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
  ConversationType,
  AddMultiMemberPayloadType,
  { rejectValue: ErrorType }
>(CONVERSATION_ADD_MEMBER, async (payload, thunkApi) => {
  try {
    const response = await http.post<ParticipantType[]>(
      API_ADD_MEMBERS_TO_CONVERSATION,
      payload as AddMultiMemberServerPayloadType
    )

    payload.conversation.participantResponse = [
      ...payload.conversation.participantResponse,
      ...response.data,
    ]

    console.log(payload.conversation.participantResponse)

    const currentUsers = payload.conversation.participantResponse.map(
      (participant) => participant.user
    )

    MySocket.addMoreMembersToGroup(payload.conversation, currentUsers)

    return payload.conversation
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
    console.log(payload)
    const response = await http.post(
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
    const response = await http.delete(API_OUT_GROUP + payload)

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
  GranPermissionPayloadType,
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
