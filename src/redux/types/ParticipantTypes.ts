import { UserType } from './UserTypes'

export enum ParticipantRoleEnum {
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  MEM = 'MEM',
}

export enum ParticipantStatusEnum {
  STABLE = 'STABLE',
  MUTED = 'MUTED',
  REMOVED = 'REMOVED',
}

export type ParticipantType = {
  id: number
  user: UserType
  createdAt: string
  updateAt: string
  nickName: string
  role: ParticipantRoleEnum
  status: ParticipantStatusEnum
}
