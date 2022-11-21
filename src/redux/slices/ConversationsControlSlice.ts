import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import {
  addMultiParticipantToConversation,
  addNewConversation,
  grantPermission,
  loadConversations,
  removeParticipant,
  updateConversationAvatarAndTitle,
} from '../thunks/ConversationThunks'
import { forwardOneMessage, saveMessage } from '../thunks/MessageThunks'
import {
  ConversationControlType,
  ConversationType,
} from '../types/ConversationTypes'
import { ParticipantType } from '../types/ParticipantTypes'

const initialState: ConversationControlType = {
  currentChat: null,
  conversationList: [],
  isLoadingChatList: true,
}

const conversationsControlSlice = createSlice({
  name: 'chatsControl',
  initialState,
  reducers: {
    resetCurrentChat: (state) => {
      state.currentChat = null
    },
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

      if (state.currentChat && state.currentChat.id === action.payload.id) {
        state.currentChat = null
      }
    },
    addNewConversation: (state, action: PayloadAction<ConversationType>) => {
      const existingConver = state.conversationList.find(
        (conver) => conver.id === action.payload.id
      )

      if (existingConver === undefined) {
        state.conversationList.push(action.payload)
      }
    },
    addMoreMembersToConversation: (
      state,
      action: PayloadAction<[ConversationType, ParticipantType[]]>
    ) => {
      const existingConver = state.conversationList.find(
        (conver) => conver.id === action.payload[0].id
      )

      if (existingConver === undefined) {
        let newConver = action.payload[0]

        for (let parti of action.payload[1]) {
          newConver.participantResponse.push(parti)
        }

        state.conversationList.push(action.payload[0])
      } else {
        const existingParti = existingConver.participantResponse.find(
          (parti) => parti.id === action.payload[1][0].id
        )

        if (existingParti === undefined) {
          for (let parti of action.payload[1]) {
            existingConver.participantResponse.push(parti)

            if (
              state.currentChat &&
              state.currentChat.id === existingConver.id
            ) {
              state.currentChat.participantResponse.push(parti)
            }
          }
        }
      }
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
        const existingConver = state.conversationList.find(
          (conver) => conver.id === action.payload.converId
        )

        if (state.currentChat && existingConver !== undefined) {
          for (let participant of action.payload.newParticipants) {
            state.currentChat.participantResponse.push(participant)
            existingConver.participantResponse.push(participant)
          }
        }
      }
    )

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
