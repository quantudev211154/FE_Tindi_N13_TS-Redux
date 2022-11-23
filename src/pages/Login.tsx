import { useEffect } from 'react'
import LoginFooter from '../components/login/LoginFooter'
import LoginForm from '../components/login/LoginForm'
import LoginHeader from '../components/login/LoginHeader'
import UnderlayerBgr from '../assets/login_illutration_background.jpg'
import { useAppSelector } from '../redux_hooks'
import { authState } from '../redux/slices/AuthSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { isAuth } = useAppSelector(authState)

  useEffect(() => {
    if (isAuth) navigate('..')
  }, [isAuth])

  useEffect(() => {
    document.title = 'Tindi - Đăng nhập'
  }, [])

  return (
    <div className='relative w-full h-[100vh]'>
      <figure className='w-full h-full'>
        <img src={UnderlayerBgr} className='w-full h-full object-cover' />
      </figure>
      <div
        className='absolute bg-white p-8 rounded-md
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      w-5/6 md:w-1/3'
      >
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  )
}

export default Login
