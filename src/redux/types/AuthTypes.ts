import { AppDispatch } from '../../redux_store'
import { UserType } from './UserTypes'

export type AuthSliceType = {
  isAuthLoading: boolean
  isAuth: boolean
  currentUser: UserType | null
  loginErrorMsg: string | null
}

export type LoginPayloadType = {
  phone: string // It mean "phone" in ILoginForm
  password: string
}

export type LoginResponseType = {
  phone: string
  loginDate: number
  id: number
  accessToken: string
  refreshToken: string
}

export type LoginThunkReturnType = {
  userId: number
  phone: string
  name: string
  avatar: string
  accessToken: string
  refreshToken: string
}

export type RegisterPayloadType = {
  phone: string
  fullName: string
  password: string
  avatar: string
}

export type CheckAuthPayload = {
  dispatch: AppDispatch
  reloadUser: Function
}
