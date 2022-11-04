import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import { OverlaysType } from '../types/OverlaysTypes'

const initialState: OverlaysType = {
  openConfirmLogoutOverlay: false,
  openContactOverlay: false,
  openForwardMessageOverlay: false,
  openPreviewFilesInMessage: false,
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
    toggleForwardMessageOverlay: (state) => {
      state.openForwardMessageOverlay = !state.openForwardMessageOverlay
    },
    togglePreviewFilesInMessage: (state) => {
      state.openPreviewFilesInMessage = !state.openPreviewFilesInMessage
    },
  },
})

export const controlOverlaysState = (state: RootState) => state.controlOverlays
export const controlOverlaysActions = controlOverlaysSlice.actions
export default controlOverlaysSlice.reducer
