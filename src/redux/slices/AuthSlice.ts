import { createSlice } from '@reduxjs/toolkit'
import { AUTH_SLICE_NAME } from '../../constants/ReduxConstant'
import { RootState } from '../../redux_store'
import { JWT } from '../../utilities/jwt/JWT'
import { checkAuth, login } from '../thunks/AuthThunks'
interface ICurrentUser {
  name: string | null
  phone: string | null
  avatar: string | null
}

interface IAuthSlice {
  isAuthLoading: boolean
  isAuth: boolean
  currentUser: ICurrentUser | null
  loginErrorMsg: string | null
}

const initialState: IAuthSlice = {
  isAuthLoading: true,
  isAuth: false,
  currentUser: null,
  loginErrorMsg: null,
}

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    logout: (state) => {
      JWT.deleteToken()
      state.isAuth = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true
      state.isAuthLoading = false
      state.currentUser = {
        phone: action.payload?.phone as string,
        name: action.payload?.name as string,
        avatar: action.payload?.avatar as string,
      }
      state.loginErrorMsg = null

      JWT.setToken(action.payload?.accessToken as string)
    })

    builder.addCase(login.rejected, (state, action) => {
      state.isAuth = false
      state.currentUser = null
      state.isAuthLoading = false

      state.loginErrorMsg = action.payload?.message as string
    })

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuth = action.payload
    })
  },
})

export const authState = (state: RootState) => state.auth
export const authActions = authSlice.actions
export default authSlice.reducer
