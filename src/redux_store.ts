import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './redux/slices/AuthSlice'
import ConversationControlSlice from './redux/slices/ConversationsControlSlice'
import ControlOverlaysSlice from './redux/slices/ControlOverlaysSlice'
import CurrentChatNavigationSlice from './redux/slices/CurrentChatNavigationSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    conversationsControl: ConversationControlSlice,
    currentChatNavigation: CurrentChatNavigationSlice,
    controlOverlays: ControlOverlaysSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
