import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import { loadMessageOfConversation, saveMessage } from '../thunks/MessageThunks'
import { ConversationDetailTypes } from '../types/ConversationDetailTypes'
import { MessageType, SaveMessageFullfilled } from '../types/MessageTypes'
import { CONVERSATION_DETAIL_NAME } from './../../constants/ReduxConstant'

const initialState: ConversationDetailTypes = {
  isLoadingMessageList: false,
  messageList: [],
}

const conversationDetailSlice = createSlice({
  name: CONVERSATION_DETAIL_NAME,
  initialState,
  reducers: {
    addNewMessageToCurrentChat: (state, action) => {
      state.messageList = [...state.messageList, action.payload]
    },
    updateMessageBySocketFlag: (state, action: PayloadAction<MessageType>) => {
      for (let iterator of state.messageList) {
        if (iterator.socketFlag === action.payload.socketFlag) {
          iterator.id = action.payload.id
          iterator.attachmentResponseList =
            action.payload.attachmentResponseList
          iterator.isLoading = false
        }
      }
    },
    revokeMessage: (state, action: PayloadAction<MessageType>) => {
      for (const message of state.messageList) {
        if (message.id === action.payload.id) message.delete = true
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMessageOfConversation.pending, (state) => {
      state.isLoadingMessageList = true
    })

    builder.addCase(loadMessageOfConversation.fulfilled, (state, action) => {
      state.messageList = action.payload
      state.isLoadingMessageList = false
    })

    builder.addCase(saveMessage.fulfilled, (state, action) => {
      for (let iterator of state.messageList) {
        if (iterator.socketFlag === action.payload.message.socketFlag) {
          const latestMsg = action.payload.message
          iterator.id = latestMsg.id
          iterator.attachmentResponseList = latestMsg.attachmentResponseList
          iterator.isLoading = false
        }
      }
    })
  },
})

export const conversationDetailState = (state: RootState) => state.converDetail
export const conversationDetailActions = conversationDetailSlice.actions
export default conversationDetailSlice.reducer
