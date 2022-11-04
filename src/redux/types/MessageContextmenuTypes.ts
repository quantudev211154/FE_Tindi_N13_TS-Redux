import { MessageType } from './MessageTypes'

export type MessageContextItemHandlerResult = {
  status: boolean | undefined
  msg: string
}

export type MessageContextMenuType = {
  currentMessage: MessageType | undefined
  inBackgroundMessage: MessageType | undefined
  currentPageX: number
  currentPageY: number
  isOverflowScreenHeight: boolean
  isOverflowScreenWidth: boolean
  handlerResult: MessageContextItemHandlerResult | undefined
}
