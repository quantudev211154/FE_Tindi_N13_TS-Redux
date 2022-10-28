import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import { loadMessageOfConversation } from '../thunks/MessageThunks'
import { ConversationDetailTypes } from '../types/ConversationDetailTypes'
import { CONVERSATION_DETAIL_NAME } from './../../constants/ReduxConstant'

const initialState: ConversationDetailTypes = {
  messageList: [],
}

const conversationDetailSlice = createSlice({
  name: CONVERSATION_DETAIL_NAME,
  initialState,
  reducers: {
    addNewMessageToCurrentChat: (state, action) => {
      state.messageList = [...state.messageList, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMessageOfConversation.fulfilled, (state, action) => {
      state.messageList = action.payload
    })
  },
})

export const conversationDetailState = (state: RootState) => state.converDetail
export const conversationDetailActions = conversationDetailSlice.actions
export default conversationDetailSlice.reducer
