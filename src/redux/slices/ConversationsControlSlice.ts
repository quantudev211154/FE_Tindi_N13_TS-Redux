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
    changeCurrentChat: (
      state,
      action: PayloadAction<number | ConversationType>
    ) => {
      if (typeof action.payload === 'number') {
        const selectedChat = state.conversationList.find(
          (conversation) => conversation.id === (action.payload as number)
        )

        state.currentChat = selectedChat as ConversationType
      } else {
        state.currentChat = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadConversations.pending, (state, action) => {
      state.isLoadingChatList = true
    })
    builder.addCase(loadConversations.fulfilled, (state, action) => {
      state.conversationList = action.payload
      state.isLoadingChatList = false
    })
    builder.addCase(addNewConversation.fulfilled, (state, action) => {
      state.conversationList.unshift(action.payload)

      state.currentChat = state.conversationList[0]
    })
  },
})

export const conversationsControlState = (state: RootState) =>
  state.conversationsControl
export const conversationActions = conversationsControlSlice.actions
export default conversationsControlSlice.reducer
