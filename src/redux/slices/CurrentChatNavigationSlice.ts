import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import { ChatNavigationType } from '../types/CurrentChatNavigationTypes'

const initialState: ChatNavigationType = {
  openExpandedPanel: false,
}

const currentChatNavigationSlice = createSlice({
  name: 'currentChatNavigation',
  initialState,
  reducers: {
    toggleExpandedPanel: (state, action: PayloadAction<boolean>) => {
      state.openExpandedPanel = action.payload
    },
  },
})

export const currentChatNavigationState = (state: RootState) =>
  state.currentChatNavigation
export const { toggleExpandedPanel } = currentChatNavigationSlice.actions
export default currentChatNavigationSlice.reducer
