import { MessageType } from '../redux/types/MessageTypes'
import { UserType } from '../redux/types/UserTypes'

export enum SocketEventEnum {
  FIRE_CONNECTION = 'FIRE_CONNECTION',
  TYPING_MSG = 'TYPING_MSG',
  CHANGE_TYPING_STATE = 'CHANGE_TYPING_STATE',
  SEND_MSG = 'SEND_MSG',
  RECEIVE_MSG = 'RECEIVE_MSG',
  DISCONNECT = 'DISCONNECT',
  FORWARD = 'FORWARD',
  BLOCK = 'BLOCK',
  SEND_REVOKE_MSG_CMD = 'SEND_REVOKE_MSG_CMD',
  REVOKE_MSG = 'REVOKE_MSG',
  SEND_UPDATE_MSG_CMD = 'SEND_UPDATE_MSG_CMD',
  UPDATE_MSG = 'UPDATE_MSG',
}

export enum MessageInSocketEnum {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
}

export type SendMessageWithSocketPayload = {
  message: MessageType
  to: UserType
}
