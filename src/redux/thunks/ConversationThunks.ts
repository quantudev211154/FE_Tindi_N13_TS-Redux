import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ADD_CONVER, API_LOAD_CONVERS } from '../../constants/APIConstant'
import {
  CONVERSATION_ADD_NEW_CONVER,
  CONVERSATION_LOAD_CONVERS_THUNK,
} from '../../constants/ReduxConstant'
import {
  AddNewConversationPayloadType,
  ConversationType,
} from '../types/ConversationTypes'
import { ErrorType } from '../types/ErrorType'

export const loadConversations = createAsyncThunk<
  any,
  number,
  { rejectValue: ErrorType }
>(CONVERSATION_LOAD_CONVERS_THUNK, async (payload: number, thunkApi) => {
  try {
    const response = await axios.get(`${API_LOAD_CONVERS}/${payload}`)

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
    const response = await axios.post(API_ADD_CONVER, payload)

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
