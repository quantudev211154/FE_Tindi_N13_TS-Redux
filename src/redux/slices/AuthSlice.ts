import { createSlice } from '@reduxjs/toolkit'
import { LOCAL_REFRESH_TOKEN_NAME } from '../../constants/AuthConstant'
import { AUTH_SLICE_NAME } from '../../constants/ReduxConstant'
import { RootState } from '../../redux_store'
import { JWT } from '../../utilities/jwt/JWT'
import { checkAuth, login } from '../thunks/AuthThunks'
interface ICurrentUser {
  id: number | null
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
      state.isAuthLoading = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true
      state.isAuthLoading = false
      state.currentUser = {
        ...state,
        id: parseInt(action.payload?.userId as string),
        phone: action.payload?.phone as string,
        name: action.payload?.name as string,
        avatar: action.payload?.avatar as string,
      }
      state.loginErrorMsg = null

      JWT.setToken(action.payload?.accessToken as string)

      localStorage.setItem(
        LOCAL_REFRESH_TOKEN_NAME,
        action.payload.refreshToken
      )
    })

    builder.addCase(login.rejected, (state, action) => {
      state.isAuth = false
      state.currentUser = null
      state.isAuthLoading = false

      state.loginErrorMsg = action.payload?.message as string
    })

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuth = action.payload
      state.isAuthLoading = false
    })
  },
})

export const authState = (state: RootState) => state.auth
export const authActions = authSlice.actions
export default authSlice.reducer
