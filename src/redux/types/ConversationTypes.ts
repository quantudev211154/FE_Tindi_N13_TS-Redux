import { MessageType } from './MessageTypes'
import {
  ParticipantRoleEnum,
  ParticipantStatusEnum,
  ParticipantType,
} from './ParticipantTypes'
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
  participantResponse: ParticipantType[]
  messageLatest: MessageType | null
}

export type ConversationControlType = {
  currentChat: ConversationType | null
  conversationList: ConversationType[]
  isLoadingChatList: boolean
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

export type AddNewConversationPayloadType = {
  title: string
  avatar: string
  user: UserType
  phones: string[]
}

export type UpdateConversationPayloadType = {
  formData: FormData
  conversationId: number
}

export type RemoveMemberPayload = {
  adminId: number
  participantId: number
}

export type GranPermissionPayloadType = {
  adminId: number
  participantId: number
  role: ParticipantRoleEnum
}

export type AddMultiMemberPayloadType = {
  conversationId: number
  phones: string[]
  status: ParticipantStatusEnum
  createdAt: string
}

export type AddMultiMemberReturnType = {
  converId: number
  newParticipants: ParticipantType[]
}

export type OutGroupPayloadType = {
  converId: number
  participantId: number
}
