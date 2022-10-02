import { useEffect } from 'react'
import UnderlayerBgr from '../assets/login_illutration_background.jpg'
import RegisterFooter from '../components/register/RegisterFooter'
import RegisterForm from '../components/register/RegisterForm'
import RegisterHeader from '../components/register/RegisterHeader'

const Register = () => {
  useEffect(() => {
    document.title = 'Tindi - Đăng kí tài khoản'
  }, [])

  return (
    <div className='relative w-full h-[100vh]'>
      <figure className='w-full h-full'>
        <img src={UnderlayerBgr} className='w-full h-full object-cover' />
      </figure>
      <div
        className='absolute bg-white p-8 rounded-md
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      w-2/3 md:w-1/3'
      >
        <RegisterHeader />
        <RegisterForm />
        <RegisterFooter />
      </div>
    </div>
  )
}

export default Register
