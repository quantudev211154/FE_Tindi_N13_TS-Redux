import { createAsyncThunk } from '@reduxjs/toolkit'
import { data } from 'autoprefixer'
import axios, { AxiosError } from 'axios'
import { API_LOGIN } from '../../constants/APIConstant'
import { AUTH_LOGIN_THUNK } from '../../constants/ReduxConstant'
import {
  LoginErrorType,
  LoginPayloadType,
  LoginThunkReturnType,
} from '../types/AuthTypes'
import { AUTH_CHECK_AUTH_THUNK } from './../../constants/ReduxConstant'
import { JWT } from './../../utilities/jwt/JWT'

export const login = createAsyncThunk<
  LoginThunkReturnType, //return type
  LoginPayloadType, //payload type
  { rejectValue: LoginErrorType }
>(AUTH_LOGIN_THUNK, async (payload, thunkApi) => {
  try {
    const formData = new FormData()
    formData.append('phone', payload.phone)
    formData.append('password', payload.password)

    const response = await axios.post(API_LOGIN, formData)

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err: LoginErrorType = {
        message: error.message,
      }

      return thunkApi.rejectWithValue(err)
    } else return thunkApi.rejectWithValue({ message: 'Lỗi máy chủ' })
  }
})

export const checkAuth = createAsyncThunk(AUTH_CHECK_AUTH_THUNK, async () => {
  const token = JWT.getToken()

  if (token) return true
  else {
    const success = await JWT.getRefreshToken()

    if (success) return true
  }

  return false
})
