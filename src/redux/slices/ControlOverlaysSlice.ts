import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import { OverlaysType } from '../types/OverlaysType'

const initialState: OverlaysType = {
  openConfirmLogoutOverlay: false,
  openContactOverlay: false,
}

const controlOverlaysSlice = createSlice({
  name: 'controlOVerlaysSlice',
  initialState,
  reducers: {
    toggleConfirmLogoutOverlay: (state) => {
      state.openConfirmLogoutOverlay = !state.openConfirmLogoutOverlay
    },
    toggleContactOverlay: (state) => {
      state.openContactOverlay = !state.openContactOverlay
    },
  },
})

export const controlOverlaysState = (state: RootState) => state.controlOverlays
export const controlOverlaysActions = controlOverlaysSlice.actions
export default controlOverlaysSlice.reducer
