import { createSlice } from '@reduxjs/toolkit'
import { CONVERSATION_DETAIL_NAME } from './../../constants/ReduxConstant'

const initialState = {}

const conversationDetailSlice = createSlice({
  name: CONVERSATION_DETAIL_NAME,
  initialState,
  reducers: {},
})

export default conversationDetailSlice.reducer
