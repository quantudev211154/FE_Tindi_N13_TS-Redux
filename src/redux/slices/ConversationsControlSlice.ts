import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import { loadConversations } from '../thunks/ConversationThunks'
import {
  ConversationControlType,
  ConversationType,
} from '../types/ConversationTypes'

const initialState: ConversationControlType = {
  currentChat: null,
  conversationList: [],
}

const conversationsControlSlice = createSlice({
  name: 'chatsControl',
  initialState,
  reducers: {
    changeCurrentChat: (state, action) => {
      const selectedChat = state.conversationList.find(
        (conversation) => conversation.id === action.payload
      )

      state.currentChat = selectedChat as ConversationType
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadConversations.fulfilled, (state, action) => {
      state.conversationList = action.payload
    })
  },
})

export const conversationsControlState = (state: RootState) =>
  state.conversationsControl
export const conversationActions = conversationsControlSlice.actions
export default conversationsControlSlice.reducer
