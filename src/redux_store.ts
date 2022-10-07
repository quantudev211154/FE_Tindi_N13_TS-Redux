import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './redux/slices/AuthSlice'
import ChatsControlSlice from './redux/slices/ChatsControlSlice'
import CurrentChatNavigationSlice from './redux/slices/CurrentChatNavigationSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    chatsControl: ChatsControlSlice,
    currentChatNavigation: CurrentChatNavigationSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
