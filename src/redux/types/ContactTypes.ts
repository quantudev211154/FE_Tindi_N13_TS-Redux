export type ContactType = {
  id: number
  fullName: string
  phone: string
  email: string
  createdAt: Date
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
  createdAt: Date
  blocked: boolean
  avatar: string | null
}
