import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux_store'

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
  name: 'auth',
  initialState,
  reducers: {},
})

export const authState = (state: RootState) => state.auth
export default authSlice.reducer
