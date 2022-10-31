import { createSlice } from '@reduxjs/toolkit'
import { CONTACT_SLICE_NAME } from '../../constants/ReduxConstant'
import { RootState } from '../../redux_store'
import { loadContacts } from '../thunks/ContactThunk'
import { ContactsSliceType } from '../types/ContactTypes'

const initialState: ContactsSliceType = {
  isLoadingContacts: false,
  contacts: null,
}

const contactSlice = createSlice({
  name: CONTACT_SLICE_NAME,
  initialState,
  reducers: {
    addNewContactInLocal: (state, action) => {
      state.contacts?.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadContacts.pending, (state) => {
      state.isLoadingContacts = true
    })
    builder.addCase(loadContacts.fulfilled, (state, action) => {
      state.contacts = action.payload
      state.isLoadingContacts = false
    })
  },
})

export const contactActions = contactSlice.actions
export const contactState = (state: RootState) => state.contacts
export default contactSlice.reducer
