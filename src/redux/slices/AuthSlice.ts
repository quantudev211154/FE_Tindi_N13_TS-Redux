import { createSlice } from '@reduxjs/toolkit'
import { LOCAL_REFRESH_TOKEN_NAME } from '../../constants/AuthConstant'
import { AUTH_SLICE_NAME } from '../../constants/ReduxConstant'
import { RootState } from '../../redux_store'
import { JWT } from '../../utilities/jwt/JWT'
import { checkAuth, login } from '../thunks/AuthThunks'
import { AuthSliceType, CurrentUserType } from '../types/AuthTypes'

const initialState: AuthSliceType = {
  isAuthLoading: true,
  isAuth: false,
  currentUser: null,
  loginErrorMsg: null,
}

const authSlice = createSlice({
  name: AUTH_SLICE_NAME,
  initialState,
  reducers: {
    reloadCurrentUser: (state, action) => {
      state.currentUser = action.payload as CurrentUserType
    },
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
        id: action.payload?.userId,
        phone: action.payload?.phone as string,
        fullName: action.payload?.name as string,
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

    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isAuth = false
      state.isAuthLoading = true
    })
  },
})

export const authState = (state: RootState) => state.auth
export const authActions = authSlice.actions
export default authSlice.reducer
