import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  API_LOAD_MSG_OF_CONVER,
  API_SAVE_MSG,
} from '../../constants/APIConstant'
import {
  CONVERSATION_DETAIL_LOAD_MESSAGES,
  CONVERSATION_DETAIL_SAVE_MESSAGE,
} from '../../constants/ReduxConstant'
import { ErrorType } from '../types/ErrorType'
import { MessageType, SaveMessagePayload } from '../types/MessageTypes'

export const loadMessageOfConversation = createAsyncThunk<
  MessageType[],
  number,
  { rejectValue: ErrorType }
>(CONVERSATION_DETAIL_LOAD_MESSAGES, async (payload, thunkApi) => {
  try {
    const response = await axios.get(API_LOAD_MSG_OF_CONVER + payload)

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
  MessageType,
  SaveMessagePayload,
  { rejectValue: ErrorType }
>(CONVERSATION_DETAIL_SAVE_MESSAGE, async (payload, thunkApi) => {
  try {
    const response = await axios.post(API_SAVE_MSG, payload)

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
