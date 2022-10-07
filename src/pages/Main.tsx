import { useAppSelector } from '../redux_hooks'
import { authState } from '../redux/slices/AuthSlice'
import { useEffect } from 'react'
import LeftCol from '../components/main/left/LeftCol'
import RightCol from '../components/main/right/RightCol'

const Main = () => {
  const { currentUser } = useAppSelector(authState)

  useEffect(() => {
    document.title = `Tindi - ${
      currentUser ? currentUser.name : 'In Testing User'
    }`
  }, [])

  return (
    <div className='w-full h-[100vh] relative flex flex-row justify-between items-center'>
      <LeftCol />
      <RightCol />
    </div>
  )
}

export default Main
