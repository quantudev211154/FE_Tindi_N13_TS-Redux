import { MessageType } from '../redux/types/MessageTypes'
import { UserType } from '../redux/types/UserTypes'

export enum SocketEventEnum {
  FIRE_CONNECTION = 'FIRE_CONNECTION',
  TYPING_MSG = 'TYPING_MSG',
  CHANGE_TYPING_STATE = 'CHANGE_TYPING_STATE',
  SEND_MSG = 'SEND_MSG',
  RECEIVE_MSG = 'RECEIVE_MSG',
  SEND_FRIEND_INVITATION = 'SEND_FRIEND_INVITATION',
  RECEIVE_FRIEND_INVITATION = 'RECEIVE_FRIEND_INVITATION',
  DISCONNECT = 'DISCONNECT',
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
