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

const Main = () => {
  const { currentUser } = useAppSelector(authState)
  const { addNewMessageToCurrentChat } = conversationDetailActions
  const dispatch = useAppDispatch()

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

  return (
    <div className='w-full h-[100vh] relative flex flex-row justify-between items-center'>
      <LeftCol />
      <RightCol />
    </div>
  )
}

export default Main
