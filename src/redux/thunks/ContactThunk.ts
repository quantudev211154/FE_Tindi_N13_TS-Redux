import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  API_ADD_NEW_CONTACT,
  API_LOAD_CONTACTS,
} from '../../constants/APIConstant'
import {
  CONTACT_ADD_NEW_CONTACT,
  CONTACT_LOAD_CONTACTS,
} from '../../constants/ReduxConstant'
import http from '../../utilities/http/Http'
import {
  AddNewContactPayloadType,
  LoadContactsReturnType,
} from '../types/ContactTypes'
import { ErrorType } from '../types/ErrorType'

export const loadContacts = createAsyncThunk<
  LoadContactsReturnType[],
  number,
  { rejectValue: ErrorType }
>(CONTACT_LOAD_CONTACTS, async (payload, thunkApi) => {
  try {
    const response = await http.get(API_LOAD_CONTACTS + payload)

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

export const addNewContact = createAsyncThunk<
  AddNewContactPayloadType,
  any,
  { rejectValue: ErrorType }
>(CONTACT_ADD_NEW_CONTACT, async (payload, thunkApi) => {
  try {
    const response = await http.post(API_ADD_NEW_CONTACT, payload)

    console.log(response.data)
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
