import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_LOAD_CONVERS } from '../../constants/APIConstant'
import { CONVERSATION_LOAD_CONVERS_THUNK } from '../../constants/ReduxConstant'
import { LoadConversationReturnType } from '../types/ConversationTypes'

export const loadConversations = createAsyncThunk(
  CONVERSATION_LOAD_CONVERS_THUNK,
  async (payload: number, thunkApi) => {
    try {
      const response = await axios.get(`${API_LOAD_CONVERS}/${payload}`)

      return response.data as LoadConversationReturnType
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = {
          message: error.message,
        }

        return thunkApi.rejectWithValue(err)
      } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
    }
  }
)
