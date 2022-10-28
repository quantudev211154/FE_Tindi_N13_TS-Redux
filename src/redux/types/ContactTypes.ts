import { UserType } from './UserTypes'

export type ContactType = {
  id: number
  fullName: string
  phone: string
  email: string
  createdAt: string
  blocked: boolean
  avatar: string | null
}

export type ContactsSliceType = {
  contacts: ContactType[] | null
}

export type LoadContactsReturnType = {
  id: number
  fullName: string
  phone: string
  email: string
  createdAt: string
  blocked: boolean
  avatar: string | null
}

export type AddNewContactPayloadType = {
  fullName: string
  phone: string
  email?: string
  createdAt?: string
  isBlocked: boolean
  user: UserType
}
