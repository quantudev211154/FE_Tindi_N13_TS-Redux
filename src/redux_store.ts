import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './redux/slices/AuthSlice'
import ConversationControlSlice from './redux/slices/ConversationsControlSlice'
import ControlOverlaysSlice from './redux/slices/ControlOverlaysSlice'
import CurrentChatNavigationSlice from './redux/slices/CurrentChatNavigationSlice'
import ConversationDetailSlice from './redux/slices/ConversationDetailSlice'
import ContactSlice from './redux/slices/ContactSlice'
import MessageContextmenuSlice from './redux/slices/MessageContextmenuSlice'
import Responsive from './redux/slices/Responsive'
import FileViewerSlice from './redux/slices/FileViewerSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    conversationsControl: ConversationControlSlice,
    currentChatNavigation: CurrentChatNavigationSlice,
    controlOverlays: ControlOverlaysSlice,
    contacts: ContactSlice,
    converDetail: ConversationDetailSlice,
    messageContextMenu: MessageContextmenuSlice,
    responsive: Responsive,
    fileViewer: FileViewerSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
