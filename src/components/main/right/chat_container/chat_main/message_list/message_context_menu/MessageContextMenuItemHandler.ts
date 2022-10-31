import { MessageContextItemHandlerResult } from '../../../../../../../redux/types/MessageContextmenuTypes'
import { MessageType } from '../../../../../../../redux/types/MessageTypes'

export const copyMessageTextToClipboard = (
  message: MessageType
): MessageContextItemHandlerResult => {
  navigator.clipboard.writeText(message.message)

  const result: MessageContextItemHandlerResult = {
    status: true,
    msg: 'Đã copy nội dung vào clipboard',
  }
  return result
}
