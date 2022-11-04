import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import {
  addNewConversation,
  loadConversations,
} from '../thunks/ConversationThunks'
import {
  ConversationControlType,
  ConversationType,
} from '../types/ConversationTypes'

const initialState: ConversationControlType = {
  currentChat: null,
  conversationList: [],
  isLoadingChatList: true,
}

const conversationsControlSlice = createSlice({
  name: 'chatsControl',
  initialState,
  reducers: {
    changeCurrentChat: (state, action: PayloadAction<ConversationType>) => {
      state.currentChat = action.payload
    },
    resetConversationSlice: (state) => {
      state.currentChat = null
      state.isLoadingChatList = true
      state.conversationList = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadConversations.pending, (state) => {
      state.isLoadingChatList = true
    })
    builder.addCase(
      loadConversations.fulfilled,
      (state, action: PayloadAction<ConversationType[]>) => {
        state.conversationList = action.payload
        state.isLoadingChatList = false
      }
    )
    builder.addCase(addNewConversation.pending, (state) => {
      state.isLoadingChatList = true
    })
    builder.addCase(addNewConversation.fulfilled, (state, action) => {
      state.conversationList.unshift(action.payload)

      state.currentChat = state.conversationList[0]

      state.isLoadingChatList = false
    })
  },
})

export const conversationsControlState = (state: RootState) =>
  state.conversationsControl
export const conversationActions = conversationsControlSlice.actions
export default conversationsControlSlice.reducer
