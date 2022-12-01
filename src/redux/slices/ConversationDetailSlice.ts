import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CurrentChatUtil from '../../class/CurrentChatClass'
import { RootState } from '../../redux_store'
import { loadMessageOfConversation, saveMessage } from '../thunks/MessageThunks'
import { ConversationDetailTypes } from '../types/ConversationDetailTypes'
import { MessageType } from '../types/MessageTypes'
import { ParticipantType } from '../types/ParticipantTypes'
import { CONVERSATION_DETAIL_NAME } from './../../constants/ReduxConstant'

const initialState: ConversationDetailTypes = {
  isLoadingMessageList: false,
  messageList: [],
  replyingMessage: null,
  currentScrollHeight: 0,
}

const conversationDetailSlice = createSlice({
  name: CONVERSATION_DETAIL_NAME,
  initialState,
  reducers: {
    setCurrentScrollHeight: (state, action: PayloadAction<number>) => {
      state.currentScrollHeight = action.payload
    },
    testInfinite: (state) => {
      let t = state.messageList
      state.messageList.unshift(...t)
    },
    setLoadingMessageList: (state) => {
      state.isLoadingMessageList = true
    },
    addNewMessageToCurrentChat: (state, action: PayloadAction<MessageType>) => {
      const existingMsg =
        state.messageList &&
        state.messageList.find(
          (msg) => msg.socketFlag === action.payload.socketFlag
        )

      if (existingMsg === undefined)
        state.messageList = state.messageList && [
          ...state.messageList,
          action.payload,
        ]
    },
    setReplyingMessage: (state, action: PayloadAction<MessageType | null>) => {
      state.replyingMessage = action.payload
    },
    updateMessageBySocketFlag: (state, action: PayloadAction<MessageType>) => {
      if (state.messageList) {
        for (let iterator of state.messageList) {
          if (iterator.socketFlag === action.payload.socketFlag) {
            iterator.id = action.payload.id
            iterator.attachmentResponseList =
              action.payload.attachmentResponseList
            iterator.isLoading = false
          }
        }
      }
    },
    revokeMessage: (state, action: PayloadAction<MessageType>) => {
      if (state.messageList) {
        for (let message of state.messageList) {
          if (message.id === action.payload.id) message.delete = true
        }
      }
    },
    deleteMessage: (
      state,
      action: PayloadAction<[MessageType, ParticipantType]>
    ) => {
      for (let iterator of state.messageList) {
        if (iterator.id === action.payload[0].id) {
          iterator.participantDeleted.push(action.payload[1])
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadMessageOfConversation.pending, (state) => {
      state.isLoadingMessageList = true
    })

    builder.addCase(loadMessageOfConversation.fulfilled, (state, action) => {
      const currentChat = CurrentChatUtil.getCurrenChat()

      if (
        !!currentChat &&
        currentChat.id === action.payload[0].conversation.id
      ) {
        state.messageList = action.payload
        state.isLoadingMessageList = false
      }
    })

    builder.addCase(loadMessageOfConversation.rejected, (state) => {
      state.isLoadingMessageList = false
    })

    builder.addCase(saveMessage.fulfilled, (state, action) => {
      if (state.messageList) {
        for (let iterator of state.messageList) {
          if (iterator.socketFlag === action.payload.message.socketFlag) {
            const latestMsg = action.payload.message
            iterator.id = latestMsg.id
            iterator.attachmentResponseList = latestMsg.attachmentResponseList
            iterator.isLoading = false
          }
        }
      }
    })
  },
})

export const conversationDetailState = (state: RootState) => state.converDetail
export const conversationDetailActions = conversationDetailSlice.actions
export default conversationDetailSlice.reducer
