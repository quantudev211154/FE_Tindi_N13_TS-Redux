import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'

interface IChatsControl {
  currentChatId: string | null
}

const initialState: IChatsControl = {
  currentChatId: '1',
}

const chatsControlSlice = createSlice({
  name: 'chatsControl',
  initialState,
  reducers: {},
})

export const chatsControlState = (state: RootState) => state.chatsControl
export default chatsControlSlice.reducer
