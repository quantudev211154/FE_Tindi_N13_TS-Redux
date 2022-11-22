import { useAppSelector } from '../redux_hooks'
import { authState } from '../redux/slices/AuthSlice'
import { useEffect } from 'react'
import LeftCol from '../components/main/left/LeftCol'
import RightCol from '../components/main/right/RightCol'
import { useAppDispatch } from './../redux_hooks'
import {
  deleteConversation as deleteConversationThunk,
  loadConversations,
} from '../redux/thunks/ConversationThunks'
import { MySocket } from '../services/TindiSocket'
import {
  SendMessageWithSocketPayload,
  SocketEventEnum,
} from '../constants/SocketConstant'
import { conversationDetailActions } from '../redux/slices/ConversationDetailSlice'
import MessageContextMenu from '../components/main/right/chat_container/chat_main/message_list/message_context_menu/MessageContextMenu'
import { messageContextmenuActions } from '../redux/slices/MessageContextmenuSlice'
import MessageContextmenuHandlerResultSnackbar from './../components/snackbar/MessageContextmenuHandlerResultSnackbar'
import { calContextMenuPos } from '../utilities/context_menu/ContextMenu'
import { conversationActions } from '../redux/slices/ConversationsControlSlice'
import { conversationsControlState } from './../redux/slices/ConversationsControlSlice'
import { showMessageHandlerResultToSnackbar } from '../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import { responsiveActions } from '../redux/slices/Responsive'
import { ConversationType } from '../redux/types/ConversationTypes'
import { ParticipantRoleEnum } from '../redux/types/ParticipantTypes'

const Main = () => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { openMessageList } = responsiveActions
  const { deleteConversation, updateStatusForParticipant } = conversationActions
  const dispatch = useAppDispatch()
  const { addNewConversation, addMoreMembersToConversation } =
    conversationActions
  const { setCurrentCoordinate } = messageContextmenuActions
  const {
    revokeMessage,
    updateMessageBySocketFlag,
    addNewMessageToCurrentChat,
  } = conversationDetailActions
  const { setHandlerResult } = messageContextmenuActions

  useEffect(() => {
    document.title = `Xin chào - ${
      currentUser ? currentUser.fullName : 'In Testing User'
    }`

    dispatch(loadConversations(currentUser?.id as number))

    MySocket.initTindiSocket(currentUser?.id as number)

    window.addEventListener('beforeunload', () => {
      MySocket.killSocketSession(currentUser?.id as number)
    })

    initSocketActions()
  }, [currentUser])

  const initSocketActions = () => {
    MySocket.getTindiSocket()?.on(
      SocketEventEnum.RECEIVE_MSG,
      (data: SendMessageWithSocketPayload) => {
        dispatch(addNewMessageToCurrentChat(data.message))
      }
    )

    MySocket.getTindiSocket()?.on(SocketEventEnum.REVOKE_MSG, (data: any) => {
      dispatch(revokeMessage(data.message))
    })

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_MSG,
      (data: SendMessageWithSocketPayload) => {
        dispatch(updateMessageBySocketFlag(data.message))
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_MEMBERS,
      (data: any) => {
        dispatch(
          addMoreMembersToConversation([data.conversation, data.participants])
        )
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_CONVERLIST_AFTER_CREATE,
      (data: any) => {
        dispatch(addNewConversation(data.newConver))
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_CONVERLIST_AFTER_DELETE,
      (data: any) => {
        if (currentChat && currentChat.id === data.conversation.id) {
          dispatch(openMessageList(false))
          console.log(123)
        }
        dispatch(deleteConversation(data.conversation))
        dispatch(deleteConversationThunk(data.conversation.id))

        const deleteConverAdmin = (
          data.conversation as ConversationType
        ).participantResponse.find(
          (parti) => parti.role === ParticipantRoleEnum.ADMIN
        )

        if (
          deleteConverAdmin !== undefined &&
          currentUser &&
          deleteConverAdmin.user.id !== currentUser.id
        ) {
          showMessageHandlerResultToSnackbar(
            false,
            `Nhóm ${data.conversation.title} vừa bị quản trị viên giải tán`,
            dispatch,
            setHandlerResult
          )
        }
      }
    )

    MySocket.getTindiSocket()?.on(
      SocketEventEnum.UPDATE_STATUS_FOR_PARTICIPANT,
      (data: any) => {
        dispatch(
          updateStatusForParticipant([data.conversation, data.to, data.status])
        )
      }
    )
  }

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const pageX = event.pageX
    const pageY = event.pageY

    calContextMenuPos(pageX, pageY, setCurrentCoordinate, dispatch)
  }

  return (
    <div
      className='main relative w-full h-[100vh] flex flex-row justify-between items-center transition-all overflow-hidden'
      onContextMenu={onContextMenu}
    >
      <LeftCol />
      <RightCol />
      <MessageContextMenu />
      <MessageContextmenuHandlerResultSnackbar />
    </div>
  )
}

export default Main
