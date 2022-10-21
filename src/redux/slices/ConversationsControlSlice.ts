import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'

interface IConversation {
  id: number
  title: string
  creatorId: string
  createdAt: Date
  status: number
  type: number
}

interface IConversationControl {
  currentChatId: number | null
  conversationList: Array<IConversation>
}

const initialState: IConversationControl = {
  currentChatId: 1,
  conversationList: [],
}

const conversationsControlSlice = createSlice({
  name: 'chatsControl',
  initialState,
  reducers: {},
})

export const conversationsControlState = (state: RootState) =>
  state.conversationsControl
export default conversationsControlSlice.reducer
