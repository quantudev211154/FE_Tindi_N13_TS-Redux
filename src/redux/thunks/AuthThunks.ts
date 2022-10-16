import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_LOGIN } from '../../constants/APIConstant'
import { AUTH_LOGIN_THUNK } from '../../constants/ReduxConstant'
import { LoginPayloadType } from '../types/AuthTypes'
import { AUTH_CHECK_AUTH_THUNK } from './../../constants/ReduxConstant'
import { JWT } from './../../utilities/jwt/JWT'

export const login = createAsyncThunk(
  AUTH_LOGIN_THUNK,
  async (payload: LoginPayloadType) => {
    try {
      const response = await axios.post(API_LOGIN, payload)

      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }
)

export const checkAuth = createAsyncThunk(AUTH_CHECK_AUTH_THUNK, async () => {
  const token = JWT.getToken()

  if (token) return true
  else {
    const success = await JWT.getRefreshToken()

    if (success) return true
  }

  return false
})
