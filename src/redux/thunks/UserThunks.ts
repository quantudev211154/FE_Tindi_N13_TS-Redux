import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_UPDATE_USER_PROFILE } from '../../constants/APIConstant'
import { USER_UPDATE_PROFILE } from '../../constants/ReduxConstant'
import { getExactTypeOfObject } from '../../utilities/getExactTypeOfObject/GetExactTypeOfObject'
import http from '../../utilities/http/Http'
import { ErrorType } from '../types/ErrorType'
import { UpdateUserInfoPayloadType, UserType } from '../types/UserTypes'

export const updateUserProfile = createAsyncThunk<
  UserType,
  UpdateUserInfoPayloadType,
  { rejectValue: ErrorType }
>(USER_UPDATE_PROFILE, async (payload, thunkApi) => {
  try {
    const formData = new FormData()
    formData.append('fullName', payload.fullName)

    if (getExactTypeOfObject(payload.avatar) !== 'String') {
      formData.append('file', payload.avatar)
    }

    const response = await http.put<UserType>(
      `${API_UPDATE_USER_PROFILE}${payload.userId}`,
      formData
    )

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
