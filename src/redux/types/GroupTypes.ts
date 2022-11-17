import {
  ConversationStatusEnum,
  ConversationTypeEnum,
} from './ConversationTypes'
import { UserType } from './UserTypes'

export type NewGroupPayloadType = {
  title?: string
  creator?: UserType
  createdAt?: string
  status?: ConversationStatusEnum
  type?: ConversationTypeEnum
  avatar?: File | string
}
