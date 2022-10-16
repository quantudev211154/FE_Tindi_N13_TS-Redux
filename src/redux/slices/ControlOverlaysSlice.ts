import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'

interface IControlOverlays {
  openConfirmLogoutOverlay: boolean
}

const initialState: IControlOverlays = {
  openConfirmLogoutOverlay: false,
}

const controlOverlaysSlice = createSlice({
  name: 'controlOVerlaysSlice',
  initialState,
  reducers: {
    toggleConfirmLogoutOverlay: (state) => {
      state.openConfirmLogoutOverlay = !state.openConfirmLogoutOverlay
    },
  },
})

export const controlOverlaysState = (state: RootState) => state.controlOverlays
export const controlOverlaysActions = controlOverlaysSlice.actions
export default controlOverlaysSlice.reducer
