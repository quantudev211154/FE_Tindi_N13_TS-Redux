import { UserType } from './UserType'

export type ConversationType = {
  id: number
  title: string
  avatar: string
  creator: UserType
  createdAt: Date
  updateAt: Date
  status: ConversationStatusEnum
  type: ConversationTypeEnum
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
  createdAt: Date
  updateAt: Date
  status: ConversationStatusEnum
  type: ConversationTypeEnum
}
