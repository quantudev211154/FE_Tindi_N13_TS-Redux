import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'
import { OverlaysType } from '../types/OverlaysTypes'

const initialState: OverlaysType = {
  openConfirmLogoutOverlay: false,
  openContactOverlay: false,
  openForwardMessageOverlay: false,
  openPreviewFilesInMessage: false,
  openNewGroupOverlay: false,
  openSettingOverlay: false,
  openViewGroupInfoOverlay: false,
  openManageGroupOverlay: false,
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
    toggleNewGroupOverlay: (state) => {
      state.openNewGroupOverlay = !state.openNewGroupOverlay
    },
    toggleSettingOverlay: (state) => {
      state.openSettingOverlay = !state.openSettingOverlay
    },
    toggleViewGroupInfoOverlay: (state) => {
      state.openViewGroupInfoOverlay = !state.openViewGroupInfoOverlay
    },
    toggleManageGroupOverlay: (state) => {
      state.openManageGroupOverlay = !state.openManageGroupOverlay
    },
  },
})

export const controlOverlaysState = (state: RootState) => state.controlOverlays
export const controlOverlaysActions = controlOverlaysSlice.actions
export default controlOverlaysSlice.reducer
