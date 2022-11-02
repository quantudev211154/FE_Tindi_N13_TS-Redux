import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_LOGIN, API_REGISTER } from '../../constants/APIConstant'
import {
  AUTH_LOGIN_THUNK,
  AUTH_REGISTER_THUNK,
} from '../../constants/ReduxConstant'
import {
  CheckAuthPayload,
  LoginPayloadType,
  LoginThunkReturnType,
  RegisterPayloadType,
} from '../types/AuthTypes'
import { ErrorType } from '../types/ErrorType'
import { AUTH_CHECK_AUTH_THUNK } from './../../constants/ReduxConstant'
import { JWT } from './../../utilities/jwt/JWT'

export const login = createAsyncThunk<
  LoginThunkReturnType, //return type
  LoginPayloadType, //payload type
  { rejectValue: ErrorType }
>(AUTH_LOGIN_THUNK, async (payload, thunkApi) => {
  try {
    const formData = new FormData()
    formData.append('phone', payload.phone)
    formData.append('password', payload.password)

    const response = await axios.post(API_LOGIN, formData)

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

export const register = createAsyncThunk(
  AUTH_REGISTER_THUNK,
  async (payload: RegisterPayloadType) => {
    try {
      await axios.post(API_REGISTER, payload)
    } catch (error) {
      console.log(error)
    }
  }
)

export const checkAuth = createAsyncThunk(
  AUTH_CHECK_AUTH_THUNK,
  async (payload: CheckAuthPayload) => {
    const { dispatch, reloadUser } = payload

    const token = JWT.getToken()

    if (token) return true
    else {
      const user = await JWT.getRefreshToken()

      dispatch(reloadUser(user))

      if (user) return true
    }

    return false
  }
)