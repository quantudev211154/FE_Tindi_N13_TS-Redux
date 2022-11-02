import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { MessageContextItemHandlerResult } from '../../../../../../../redux/types/MessageContextmenuTypes'
import { MessageType } from '../../../../../../../redux/types/MessageTypes'
import { AppDispatch } from '../../../../../../../redux_store'

export const copyMessageTextToClipboard = (
  message: MessageType
): MessageContextItemHandlerResult => {
  navigator.clipboard.writeText(message.message)

  const result: MessageContextItemHandlerResult = {
    status: true,
    msg: 'Đã sao chép nội dung vào clipboard',
  }
  return result
}

export const revokeOneMessage = (
  message: MessageType,
  additionHandler: ActionCreatorWithPayload<any, string>,
  dispatch: AppDispatch
): MessageContextItemHandlerResult => {
  dispatch(additionHandler(message.id))

  const result: MessageContextItemHandlerResult = {
    status: true,
    msg: 'Đã thu hồi tin nhắn',
  }
  return result
}
