import { MessageType } from './MessageTypes'

export type ConversationDetailTypes = {
  isLoadingMessageList: boolean
  messageList: MessageType[]
  replyingMessage: MessageType | null
  currentScrollHeight: number
}
