import { createSlice } from '@reduxjs/toolkit'
import { AUTH_SLICE_NAME } from '../../constants/ReduxConstant'
import { RootState } from '../../redux_store'
import { JWT } from '../../utilities/jwt/JWT'
import { checkAuth, login } from '../thunks/AuthThunks'
interface ICurrentUser {
  id: string | null
  name: string | null
  phone: string | null
}

interface IAuthSlice {
  isAuthLoading: boolean
  isAuth: boolean
  currentUser: ICurrentUser | null
}

const initialState: IAuthSlice = {
  isAuthLoading: false,
  isAuth: true,
  currentUser: null,
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
      state.currentUser = action.payload
    })

    builder.addCase(login.rejected, (state, action) => {
      state.isAuth = false
      state.isAuthLoading = false
      state.currentUser = null
    })

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuth = action.payload
    })
  },
})

export const authState = (state: RootState) => state.auth
export default authSlice.reducer
