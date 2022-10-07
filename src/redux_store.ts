import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './redux/slices/AuthSlice'
import ChatsControlSlice from './redux/slices/ChatsControlSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    chatsControl: ChatsControlSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
