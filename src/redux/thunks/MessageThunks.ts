import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  API_FORWARD_MSG,
  API_LOAD_MSG_OF_CONVER,
  API_REVOKE_MSG,
  API_SAVE_MSG,
} from '../../constants/APIConstant'
import {
  CONVERSATION_DETAIL_FORWARD_MESSAGE,
  CONVERSATION_DETAIL_LOAD_MESSAGES,
  CONVERSATION_DETAIL_REVOKE_MESSAGE,
  CONVERSATION_DETAIL_SAVE_MESSAGE,
} from '../../constants/ReduxConstant'
import http from '../../utilities/http/Http'
import { ErrorType } from '../types/ErrorType'
import {
  ForwardMessagePayloadType,
  MessageType,
  SaveMessageFullfilled,
  SaveMessagePayload,
} from '../types/MessageTypes'
import { MySocket } from './../../services/TindiSocket'

export const loadMessageOfConversation = createAsyncThunk<
  MessageType[],
  number,
  { rejectValue: ErrorType }
>(CONVERSATION_DETAIL_LOAD_MESSAGES, async (payload, thunkApi) => {
  try {
    const response = await http.get(API_LOAD_MSG_OF_CONVER + payload)

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

export const saveMessage = createAsyncThunk<
  SaveMessageFullfilled,
  SaveMessagePayload,
  { rejectValue: ErrorType }
>(CONVERSATION_DETAIL_SAVE_MESSAGE, async (payload, thunkApi) => {
  try {
    const response = await http.post(API_SAVE_MSG, payload.formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const returnPayload = response.data as MessageType
    returnPayload.socketFlag = payload.socketFlag

    MySocket.updateMessage({ message: returnPayload, to: payload.to })

    return { message: returnPayload }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const forwardOneMessage = createAsyncThunk<
  MessageType,
  ForwardMessagePayloadType,
  { rejectValue: ErrorType }
>(CONVERSATION_DETAIL_FORWARD_MESSAGE, async (payload, thunkApi) => {
  try {
    const response = await http.post(
      API_FORWARD_MSG + payload.converId,
      payload
    )

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

export const revokeOneMessage = createAsyncThunk<
  boolean,
  number,
  { rejectValue: ErrorType }
>(CONVERSATION_DETAIL_REVOKE_MESSAGE, async (payload, thunkApi) => {
  try {
    await http.post(API_REVOKE_MSG + payload)

    return true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = {
        message: error.message,
      }
      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})
