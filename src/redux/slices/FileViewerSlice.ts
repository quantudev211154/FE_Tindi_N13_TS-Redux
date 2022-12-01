import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FILE_VIEWER_SLICE_NAME } from '../../constants/ReduxConstant'
import { RootState } from '../../redux_store'
import { FileViewerType } from '../types/FileViwerTypes'
import { AttachmentType } from '../types/MessageTypes'

const initialState: FileViewerType = {
  isOpen: false,
  currentAttachment: undefined,
}

const fileViewerSlice = createSlice({
  name: FILE_VIEWER_SLICE_NAME,
  initialState,
  reducers: {
    toggleFileViewerOverlay: (state) => {
      state.isOpen = !state.isOpen
    },
    setCurrentAttachment: (state, action: PayloadAction<AttachmentType>) => {
      state.isOpen = true
      state.currentAttachment = action.payload
    },
  },
})

export const fileViewerState = (state: RootState) => state.fileViewer
export const fileViewerActions = fileViewerSlice.actions
export default fileViewerSlice.reducer
