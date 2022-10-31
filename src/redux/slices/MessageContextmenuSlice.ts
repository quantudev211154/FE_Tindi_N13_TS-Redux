import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MESSAGE_CONTEXT_MENU_NAME } from '../../constants/ReduxConstant'
import { RootState } from '../../redux_store'
import {
  MessageContextItemHandlerResult,
  MessageContextMenuType,
} from '../types/MessageContextmenuTypes'
import { MessageType } from '../types/MessageTypes'

const initialState: MessageContextMenuType = {
  currentMessage: undefined,
  currentPageX: 0,
  currentPageY: 0,
  isOverflowScreentHeight: false,
  handlerResult: undefined,
}

const messageContextMenuSlice = createSlice({
  name: MESSAGE_CONTEXT_MENU_NAME,
  initialState,
  reducers: {
    setCurrentMessage: (
      state,
      action: PayloadAction<MessageType | undefined>
    ) => {
      state.currentMessage = action.payload
    },
    setCurrentCoordinate: (
      state,
      action: PayloadAction<[number, number, boolean]>
    ) => {
      state.currentPageX = action.payload[0]
      state.currentPageY = action.payload[1]
      state.isOverflowScreentHeight = action.payload[2]
    },
    setHandlerResult: (
      state,
      action: PayloadAction<MessageContextItemHandlerResult | undefined>
    ) => {
      state.handlerResult = action.payload
    },
  },
})

export const messageContextmenuState = (state: RootState) =>
  state.messageContextMenu
export const messageContextmenuActions = messageContextMenuSlice.actions
export default messageContextMenuSlice.reducer
