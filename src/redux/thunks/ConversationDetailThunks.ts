import { createAsyncThunk } from '@reduxjs/toolkit'
import { CONVERSATION_DETAIL_LOAD_MESSAGES } from '../../constants/ReduxConstant'

export const loadMessagesOfConversation = createAsyncThunk(
  CONVERSATION_DETAIL_LOAD_MESSAGES,
  async (payload, thunkApi) => {}
)
