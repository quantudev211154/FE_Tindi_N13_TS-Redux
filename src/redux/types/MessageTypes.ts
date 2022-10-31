import { ConversationType } from './ConversationTypes'
import { UserType } from './UserTypes'

export enum MessageTypeEnum {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'VIDEO',
  FILE = 'FILE',
}

export enum MessageStatusEnum {
  SENT = 'SENT',
}

export type MessageType = {
  id: number | string
  conversation: ConversationType
  sender: UserType
  type: MessageTypeEnum
  message: string
  createdAt: string
  status: MessageStatusEnum
  delete: boolean
}

export type SaveMessagePayload = {
  conversation: ConversationType
  sender: UserType
  messageType: MessageTypeEnum
  message: string
}
