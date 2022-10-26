import { useAppSelector } from '../redux_hooks'
import { authState } from '../redux/slices/AuthSlice'
import { useEffect } from 'react'
import LeftCol from '../components/main/left/LeftCol'
import RightCol from '../components/main/right/RightCol'
import { useAppDispatch } from './../redux_hooks'
import { loadConversations } from '../redux/thunks/ConversationThunks'

const Main = () => {
  const { currentUser } = useAppSelector(authState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = `Tindi - ${
      currentUser ? currentUser.fullName : 'In Testing User'
    }`

    dispatch(loadConversations(currentUser?.id as number))
  }, [currentUser])

  return (
    <div className='w-full h-[100vh] relative flex flex-row justify-between items-center'>
      <LeftCol />
      <RightCol />
    </div>
  )
}

export default Main
