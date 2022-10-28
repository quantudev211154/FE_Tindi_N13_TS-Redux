import { UserType } from './UserTypes'

export type ParticipantType = {
  id: number
  user: UserType
  createdAt: string
  updateAt: string
  nickName: string
}
