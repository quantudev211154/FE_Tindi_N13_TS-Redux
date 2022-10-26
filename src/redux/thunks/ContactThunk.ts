import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_LOAD_CONTACTS } from '../../constants/APIConstant'
import { CONTACT_LOAD_CONTACTS } from '../../constants/ReduxConstant'
import { LoadContactsReturnType } from '../types/ContactTypes'
import { ErrorType } from '../types/ErrorType'

export const loadContacts = createAsyncThunk<
  LoadContactsReturnType[],
  number,
  { rejectValue: ErrorType }
>(CONTACT_LOAD_CONTACTS, async (payload: number, thunkApi) => {
  try {
    const response = await axios.get(API_LOAD_CONTACTS + payload)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: ErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})
