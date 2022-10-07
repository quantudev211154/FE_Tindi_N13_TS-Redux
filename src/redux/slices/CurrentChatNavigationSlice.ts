import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'

interface IChatNavigation {
  openExpandedPanel: boolean
}

const initialState: IChatNavigation = {
  openExpandedPanel: false,
}

const currentChatNavigationSlice = createSlice({
  name: 'currentChatNavigation',
  initialState,
  reducers: {
    toggleExpandedPanel: (state) => {
      state.openExpandedPanel = !state.openExpandedPanel
    },
  },
})

export const currentChatNavigationState = (state: RootState) =>
  state.currentChatNavigation
export const { toggleExpandedPanel } = currentChatNavigationSlice.actions
export default currentChatNavigationSlice.reducer
