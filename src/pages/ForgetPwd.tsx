import { useEffect, useState } from 'react'
import UnderlayerBgr from '../assets/login_illutration_background.jpg'
import ConfirmOTP from '../components/forget_pwd/ConfirmOTP'
import ForgetPwdFooter from '../components/forget_pwd/ForgetPwdFooter'
import ForgetPwdForm from '../components/forget_pwd/ForgetPwdForm'
import ForgetPwdHeader from '../components/forget_pwd/ForgetPwdHeader'
import { FirebaseService } from '../services/FirebaseAuth'

const ForgetPwd = () => {
  const [isOpenOTPField, setIsOpenOTPField] = useState(false)
  const [phone, setPhone] = useState('')

  const openOTPField = (open: boolean) => {
    setIsOpenOTPField(open)
  }

  const setCurrentPhone = (phone: string) => {
    setPhone(phone)
  }

  useEffect(() => {
    document.title = 'Quên mật khẩu'

    FirebaseService.generateRecaptchatVerifier('recaptchaPopup')
  }, [])

  return (
    <div className='w-full h-[100vh] relative'>
      <div className='underlayer bg-gray-200 w-full h-full'>
        <img src={UnderlayerBgr} className='w-full h-full object-cover' />
      </div>
      <div className='absolute bg-white p-8 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 md:w-1/3'>
        <div
          style={{
            display: isOpenOTPField ? 'none' : 'block',
            transition: '.2s ease',
          }}
        >
          <ForgetPwdHeader />
          <ForgetPwdForm
            openOTPField={openOTPField}
            setCurrentPhone={setCurrentPhone}
          />
          <ForgetPwdFooter />
        </div>
        <div
          style={{
            display: isOpenOTPField ? 'block' : 'none',
          }}
        >
          <ConfirmOTP openOTPField={openOTPField} phone={phone} />
        </div>
        <div id='recaptchaPopup'></div>
      </div>
    </div>
  )
}

export default ForgetPwd
