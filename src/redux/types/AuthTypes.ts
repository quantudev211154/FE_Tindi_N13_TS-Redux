import { AppDispatch } from '../../redux_store'

export type CurrentUserType = {
  id: number | null
  fullName: string | null
  phone: string | null
  avatar: string | null
}

export type AuthSliceType = {
  isAuthLoading: boolean
  isAuth: boolean
  currentUser: CurrentUserType | null
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
}

export type CheckAuthPayload = {
  dispatch: AppDispatch
  reloadUser: Function
}
