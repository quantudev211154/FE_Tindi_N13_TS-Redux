import { io, Socket } from 'socket.io-client'
import { SOCKET_HOST } from '../config/SocketConfig'
import {
  SendMessageWithSocketPayload,
  SocketEventEnum,
} from '../constants/SocketConstant'

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

  killSocketSession = (currentUserId: number) => {
    this.socket?.emit(SocketEventEnum.DISCONNECT, { userId: currentUserId })
  }
}

export const MySocket = new TindiSocket()
