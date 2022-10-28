import { ParticipantType } from './ParticipantTypes'
import { UserType } from './UserTypes'

export type ConversationType = {
  id: number
  title: string
  avatar: string
  creator: UserType
  createdAt: string
  updateAt: string
  status: ConversationStatusEnum
  type: ConversationTypeEnum
  participantRespones: ParticipantType[]
}

export type ConversationControlType = {
  currentChat: ConversationType | null
  conversationList: ConversationType[]
}

export enum ConversationStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ConversationTypeEnum {
  GROUP = 'GROUP',
  SINGLE = 'SINGLE',
}

export type LoadConversationThunkReturnType = {
  id: number
  title: string
  avatar: string
  creator: UserType
  createdAt: string
  updateAt: string
  status: ConversationStatusEnum
  type: ConversationTypeEnum
}
