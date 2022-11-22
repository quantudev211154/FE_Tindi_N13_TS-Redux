import { io, Socket } from 'socket.io-client'
import { SOCKET_HOST } from '../config/SocketConfig'
import {
  SendMessageWithSocketPayload,
  SocketEventEnum,
} from '../constants/SocketConstant'
import { ConversationType } from '../redux/types/ConversationTypes'
import { MessageType } from '../redux/types/MessageTypes'
import {
  ParticipantStatusEnum,
  ParticipantType,
} from '../redux/types/ParticipantTypes'
import { UserType } from '../redux/types/UserTypes'

class TindiSocket {
  private socket: Socket | null

  constructor() {
    this.socket = null
  }

  initTindiSocket = (currentUserId: number) => {
    this.socket = io(SOCKET_HOST)
    this.socket.emit(SocketEventEnum.FIRE_CONNECTION, { userId: currentUserId })
  }

  getTindiSocket = () => this.socket

  sendMessage = (payload: SendMessageWithSocketPayload) => {
    this.socket?.emit(SocketEventEnum.SEND_MSG, payload)
  }

  updateMessage = (payload: SendMessageWithSocketPayload) => {
    this.socket?.emit(SocketEventEnum.SEND_UPDATE_MSG_CMD, payload)
  }

  killSocketSession = (currentUserId: number) => {
    this.socket?.emit(SocketEventEnum.DISCONNECT, { userId: currentUserId })
  }

  changeTypingStatus = (
    conversationId: number,
    currentUserId: number,
    targetUserId: number,
    typingStatus: boolean
  ) => {
    this.socket?.emit(SocketEventEnum.CHANGE_TYPING_STATE, {
      conversationId,
      currentUserId,
      targetUserId,
      isTyping: typingStatus,
    })
  }

  revokeMessage = (
    conversation: ConversationType,
    message: MessageType,
    targetUserId: number
  ) => {
    this.socket?.emit(SocketEventEnum.SEND_REVOKE_MSG_CMD, {
      conversation,
      message,
      targetUserId,
    })
  }

  addMoreMembersToGroup = (
    conversation: ConversationType,
    newParticipants: ParticipantType[],
    to: UserType[]
  ) => {
    this.socket?.emit(SocketEventEnum.ADD_MEMBERS, {
      conversation,
      participants: newParticipants,
      to,
    })
  }

  createNewConversation = (to: UserType[], newConver: ConversationType) => {
    this.socket?.emit(SocketEventEnum.CREATE_CONVER, {
      to,
      newConver,
    })
  }

  deleteConversation = (to: UserType[], conversation: ConversationType) => {
    this.socket?.emit(SocketEventEnum.DELETE_CONVER, { to, conversation })
  }

  changeStatusForParticipant = (
    to: UserType,
    conversation: ConversationType,
    status: ParticipantStatusEnum
  ) => {
    this.socket?.emit(SocketEventEnum.CHANGE_STATUS_FOR_PARTICIPANT, {
      to,
      conversation,
      status,
    })
  }
}

export const MySocket = new TindiSocket()
