import {
  API_FIND_MESSAGE,
  API_LOAD_ATTACHMENTS,
  API_LOAD_MSG_OF_CONVER,
} from '../constants/APIConstant'
import { ConversationType } from '../redux/types/ConversationTypes'
import { AttachmentType, MessageType } from '../redux/types/MessageTypes'
import http from '../utilities/http/Http'

export const findMessageFromServer = async (
  conver: ConversationType | null,
  keyword: string
) => {
  if (!conver) return Promise.reject(new Error('Conversation can not be null'))

  return await http.get<MessageType[]>(
    `${API_FIND_MESSAGE}${conver.id}?keyword=${keyword}`
  )
}

export const loadMessagesOfConver = async (conver: ConversationType | null) => {
  if (!conver) return Promise.reject(new Error('Conversation can not be null'))

  return await http.get<MessageType[]>(API_LOAD_MSG_OF_CONVER + conver?.id)
}

export const loadAttachmentsOfConver = async (
  conver: ConversationType | null
) => {
  if (!conver) return Promise.reject(new Error('Conversation can not be null'))

  return await http.get<AttachmentType[]>(API_LOAD_ATTACHMENTS + conver.id)
}
