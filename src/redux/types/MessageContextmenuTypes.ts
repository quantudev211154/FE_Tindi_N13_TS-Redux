import { MessageType } from './MessageTypes'

export type MessageContextItemHandlerResult = {
  status: boolean
  msg: string
}

export type MessageContextMenuType = {
  currentMessage: MessageType | undefined
  currentPageX: number
  currentPageY: number
  isOverflowScreentHeight: boolean
  handlerResult: MessageContextItemHandlerResult | undefined
}
