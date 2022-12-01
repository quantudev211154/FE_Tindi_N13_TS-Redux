import { io, Socket } from 'socket.io-client'
import { SOCKET_HOST } from '../config/SocketConfig'
import {
  SendMessageWithSocketPayload,
  SocketEventEnum,
} from '../constants/SocketConstant'
import { ConversationType } from '../redux/types/ConversationTypes'
import { MessageType } from '../redux/types/MessageTypes'
import {
  ParticipantRoleEnum,
  ParticipantStatusEnum,
  ParticipantType,
} from '../redux/types/ParticipantTypes'
import { UserType } from '../redux/types/UserTypes'

class TindiSocket {
  private socket: Socket | null
  private flag: number | null

  constructor() {
    this.socket = null
    this.flag = null
  }

  private resetSocket = () => {
    this.socket = null
    this.flag = null
  }

  getTindiFlag = () => this.flag

  initTindiSocket = (currentUserId: number) => {
    this.socket = io(SOCKET_HOST)

    if (!this.flag) {
      this.flag = new Date().getTime()
    }

    this.socket.emit(SocketEventEnum.FIRE_CONNECTION, {
      userId: currentUserId,
      flag: this.flag,
    })
  }

  getTindiSocket = () => this.socket

  sendMessage = (payload: SendMessageWithSocketPayload) => {
    this.socket?.emit(SocketEventEnum.SEND_MSG, payload)
  }

  updateMessage = (payload: SendMessageWithSocketPayload) => {
    this.socket?.emit(SocketEventEnum.SEND_UPDATE_MSG_CMD, payload)
  }

  killSocketSession = (currentUserId: number) => {
    this.socket?.emit(SocketEventEnum.DISCONNECT, {
      userId: currentUserId,
      flag: this.flag,
    })
    this.resetSocket()
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
    to: UserType[]
  ) => {
    this.socket?.emit(SocketEventEnum.SEND_REVOKE_MSG_CMD, {
      conversation,
      message,
      to,
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

  removeOneMemberOutOfGroup = (
    conversation: ConversationType,
    participant: ParticipantType,
    to: UserType[]
  ) => {
    this.socket?.emit(SocketEventEnum.REMOVE_MEMBER_OUT_OF_GROUP, {
      conversation,
      participant,
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

  outGroup = (
    conversation: ConversationType,
    participant: ParticipantType,
    to: UserType[]
  ) => {
    this.socket?.emit(SocketEventEnum.OUT_GROUP, {
      conversation,
      participant,
      to,
    })
  }

  changeRoleOfParticipant = (
    conversation: ConversationType,
    participant: ParticipantType,
    role: ParticipantRoleEnum,
    to: UserType[]
  ) => {
    this.socket?.emit(SocketEventEnum.CHANGE_ROLE_OF_PARTICIPANT, {
      conversation,
      participant,
      role,
      to,
    })
  }

  changeConverInfo = (
    conversation: ConversationType,
    avatar: string,
    groupName: string,
    to: UserType[]
  ) => {
    this.socket?.emit(SocketEventEnum.CHANGE_CONVER_INFO, {
      conversation,
      avatar,
      groupName,
      to,
    })
  }
}

export const MySocket = new TindiSocket()
