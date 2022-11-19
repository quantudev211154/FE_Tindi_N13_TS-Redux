import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import {
  addMultiParticipantToConversation,
  addNewConversation,
  deleteConversation,
  grantPermission,
  loadConversations,
  outGroupConversation,
  removeParticipant,
  updateConversationAvatarAndTitle,
} from '../thunks/ConversationThunks'
import { forwardOneMessage, saveMessage } from '../thunks/MessageThunks'
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
    deleteConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversationList = state.conversationList.filter(
        (conver) => conver.id !== action.payload.id
      )

      state.currentChat = null
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

    builder.addCase(forwardOneMessage.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        if (iterator.id === action.payload?.conversation.id) {
          iterator.messageLatest = action.payload
        }
      }
    })

    builder.addCase(saveMessage.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        if (iterator.id === action.payload.message.conversation.id) {
          const latestMsg = action.payload.message
          iterator.messageLatest = latestMsg
        }
      }
    })

    // builder.addCase(deleteConversation.pending, (state, action) => {
    //   state.isLoadingChatList = true
    // })

    // builder.addCase(deleteConversation.fulfilled, (state, action) => {
    //   state.conversationList = state.conversationList.filter(
    //     (iterator) => iterator.id != action.payload
    //   )
    //   state.currentChat = null
    //   state.isLoadingChatList = false
    // })

    builder.addCase(
      updateConversationAvatarAndTitle.fulfilled,
      (state, action) => {
        let result = state.conversationList.find(
          (conversation) => conversation.id === action.payload.id
        )
        result!.avatar = action.payload.avatar
        result!.title = action.payload.title

        state.currentChat!.avatar = action.payload.avatar
        state.currentChat!.title = action.payload.title
      }
    )

    builder.addCase(removeParticipant.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        let result = iterator.participantResponse.find(
          (participant) => participant.id === action.payload
        )

        if (result !== undefined) {
          iterator.participantResponse = iterator.participantResponse.filter(
            (participant) => participant.id !== action.payload
          )

          if (state.currentChat) {
            state.currentChat.participantResponse =
              state.currentChat?.participantResponse.filter(
                (participant) => participant.id !== action.payload
              )
          }

          return
        }
      }
    })

    builder.addCase(
      addMultiParticipantToConversation.fulfilled,
      (state, action) => {
        let result = state.conversationList.find(
          (conver) => conver.id === action.payload.converId
        )

        if (result !== undefined) {
          for (let iterator of action.payload.newParticipants) {
            result.participantResponse.push(iterator)
          }
        }

        if (state.currentChat) {
          for (let iterator of action.payload.newParticipants) {
            state.currentChat.participantResponse.push(iterator)
          }
        }
      }
    )

    // builder.addCase(outGroupConversation.fulfilled, (state, action) => {
    //   for (let iterator of state.conversationList) {
    //     state.currentChat = null

    //     let result = iterator.participantResponse.find(
    //       (participant) => participant.id === action.payload
    //     )

    //     if (result !== undefined) {
    //       iterator.participantResponse = iterator.participantResponse.filter(
    //         (parti) => parti.id !== action.payload
    //       )

    //       if (state.currentChat) {
    //         state.currentChat.participantResponse =
    //           state.currentChat.participantResponse.filter(
    //             (parti) => parti.id !== action.payload
    //           )
    //       }
    //     }
    //   }
    // })

    builder.addCase(grantPermission.fulfilled, (state, action) => {
      for (let iterator of state.conversationList) {
        let result = iterator.participantResponse.find(
          (participant) => participant.id === action.payload.id
        )

        if (result !== undefined) {
          result.role = action.payload.role

          if (state.currentChat) {
            const result2 = state.currentChat.participantResponse.find(
              (parti) => parti.id === action.payload.id
            )

            if (result2 !== undefined) {
              result2.role = action.payload.role
            }
          }
        }
      }
    })
  },
})

export const conversationsControlState = (state: RootState) =>
  state.conversationsControl
export const conversationActions = conversationsControlSlice.actions
export default conversationsControlSlice.reducer
