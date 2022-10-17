export type LoginPayloadType = {
  phone: string // It mean "phone" in ILoginForm
  password: string
}

export type LoginErrorType = {
  message: string
}

export type LoginResponseType = {
  phone: string
  loginDate: number
  id: string
  accessToken: string
}

export type LoginThunkReturnType = {
  phone: string
  name: string
  avatar: string
  accessToken: string
}

export type RegisterPayloadType = {
  phone: string
  fullName: string
  password: string
}
