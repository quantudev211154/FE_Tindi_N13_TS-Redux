import { MessageType } from './MessageTypes'

export type MessageContextItemHandlerResult = {
  status: boolean
  msg: string
}

export type MessageContextMenuType = {
  currentMessage: MessageType | undefined
  currentPageX: number
  currentPageY: number
  isOverflowScreenHeight: boolean
  isOverflowScreenWidth: boolean
  handlerResult: MessageContextItemHandlerResult | undefined
}
