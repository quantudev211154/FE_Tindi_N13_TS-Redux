import { useAppSelector } from '../redux_hooks'
import { authState } from '../redux/slices/AuthSlice'
import { useEffect } from 'react'
import LeftCol from '../components/main/left/LeftCol'
import RightCol from '../components/main/right/RightCol'
import { useAppDispatch } from './../redux_hooks'
import { loadConversations } from '../redux/thunks/ConversationThunks'
import { MySocket } from '../services/TindiSocket'
import { SocketEventEnum } from '../constants/SocketConstant'
import { conversationDetailActions } from '../redux/slices/ConversationDetailSlice'
import MessageContextMenu from '../components/main/right/chat_container/chat_main/message_list/message_context_menu/MessageContextMenu'
import { messageContextmenuActions } from '../redux/slices/MessageContextmenuSlice'
import MessageContextmenuHandlerResultSnackbar from './../components/snackbar/MessageContextmenuHandlerResultSnackbar'
import { calContextMenuPos } from '../utilities/context_menu/ContextMenu'

const Main = () => {
  const { currentUser } = useAppSelector(authState)
  const { addNewMessageToCurrentChat } = conversationDetailActions
  const dispatch = useAppDispatch()
  const { setCurrentCoordinate } = messageContextmenuActions

  useEffect(() => {
    document.title = `Xin chào - ${
      currentUser ? currentUser.fullName : 'In Testing User'
    }`

    dispatch(loadConversations(currentUser?.id as number))

    MySocket.initTindiSocket(currentUser?.id as number)

    window.addEventListener('beforeunload', () => {
      MySocket.killSocketSession(currentUser?.id as number)
    })

    MySocket.getTindiSocket()?.on(SocketEventEnum.RECEIVE_MSG, (data: any) => {
      dispatch(addNewMessageToCurrentChat(data.message))
    })
  }, [currentUser])

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const pageX = event.pageX
    const pageY = event.pageY

    calContextMenuPos(pageX, pageY, setCurrentCoordinate, dispatch)
  }

  return (
    <div
      className='w-full h-[100vh] relative flex flex-row justify-between items-center'
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
