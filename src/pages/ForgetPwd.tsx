import { useEffect } from 'react'
import UnderlayerBgr from '../assets/login_illutration_background.jpg'
import ForgetPwdFooter from '../components/forget_pwd/ForgetPwdFooter'
import ForgetPwdForm from '../components/forget_pwd/ForgetPwdForm'
import ForgetPwdHeader from '../components/forget_pwd/ForgetPwdHeader'
import { FirebaseAuthService } from '../services/FirebaseAuth'

const ForgetPwd = () => {
  useEffect(() => {
    document.title = 'Quên mật khẩu'

    FirebaseAuthService.generateRecaptchatVerifier('recaptchaPopup')
  }, [])

  return (
    <div className='w-full h-[100vh] relative'>
      <div className='underlayer bg-gray-200 w-full h-full'>
        <img src={UnderlayerBgr} className='w-full h-full object-cover' />
      </div>
      <div className='absolute bg-white p-8 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/3'>
        <ForgetPwdHeader />
        <ForgetPwdForm />
        <ForgetPwdFooter />
      </div>
      <div id='recaptchaPopup'></div>
    </div>
  )
}

export default ForgetPwd
