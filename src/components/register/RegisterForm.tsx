import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { TouchApp } from '@mui/icons-material'
import { Formik } from 'formik'
import FormErrorDisplay from '../core/FormErrorDisplay'
import { RegisterFormValidateShape } from './RegisterFormValidateShape'
import { useNavigate } from 'react-router-dom'
import { FirebaseService } from '../../services/FirebaseAuth'
import {
  RegistrationPendingAccount,
  RegistrationPendingType,
} from '../../utilities/registration/RegistrationPending'
import axios from 'axios'
import { API_CHECK_EXISTING_PHONE } from '../../constants/APIConstant'
import { randomBgrColorForAvatar } from '../../utilities/user_avatar/creatingAvatarProps'

interface IRegisterForm {
  name: string
  phone: string
  password: string
  rePassword: string
}

const initialValues: IRegisterForm = {
  name: '',
  phone: '',
  password: '',
  rePassword: '',
}

const RegisterForm = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const [phoneErr, setPhoneErr] = useState('')

  useEffect(() => {
    FirebaseService.generateRecaptchatVerifier('reptcapchaPopup')
  }, [])

  const onPhoneFieldBlur = async (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    values: IRegisterForm
  ) => {
    if (event.target.value.length === 10) {
      try {
        await axios.get(API_CHECK_EXISTING_PHONE + values.phone)

        setPhoneErr('')
      } catch (error) {
        setPhoneErr(
          'Đã có người đăng ký Tindi bằng số điện thoại này. Bạn hãy dùng một số khác nhé!'
        )
      }
    } else {
      setPhoneErr('')
    }
  }

  const onSuccessSignInWithPhone = () => {
    navigate('/confirm-phone')
  }

  const onFormSubmit = async (values: IRegisterForm) => {
    if (!phoneErr) {
      setIsProcessing(true)

      const convertedRegisterPayload: RegistrationPendingType = {
        phone: values.phone,
        password: values.password,
        fullName: values.name,
        avatar: randomBgrColorForAvatar(),
      }

      RegistrationPendingAccount.setPendingRegisterAccount(
        convertedRegisterPayload
      )

      FirebaseService.sendFirebaseAuthOTP(
        RegistrationPendingAccount.getPendingRegisterAccount()?.phone as string,
        onSuccessSignInWithPhone
      )
    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={RegisterFormValidateShape}
      >
        {({ handleSubmit, values, handleChange, handleBlur, errors }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col justify-start items-center'>
                <Stack direction='column' sx={{ width: '100%' }}>
                  <TextField
                    name='name'
                    type='text'
                    autoComplete='off'
                    label='Nhập tên bạn muốn hiển thị'
                    placeholder='VD: Nguyễn Thy Thy'
                    autoFocus
                    onChange={handleChange}
                    value={values.name}
                  />
                  <FormErrorDisplay msg={errors.name} />
                  <TextField
                    name='phone'
                    type='text'
                    autoComplete='off'
                    label='Số điện thoại của bạn'
                    placeholder='VD: 0387546271'
                    onChange={handleChange}
                    value={values.phone}
                    onBlur={(e) => {
                      handleBlur(e)
                      onPhoneFieldBlur(e, values)
                    }}
                  />
                  <FormErrorDisplay msg={errors.phone} />
                  <FormErrorDisplay
                    msg={phoneErr}
                    sx={{ transform: 'translate(0, -1rem)' }}
                  />
                  <TextField
                    name='password'
                    type={'password'}
                    label='Mật khẩu'
                    autoComplete='off'
                    placeholder='Đừng dùng mật khẩu dễ đoán nhé'
                    onChange={handleChange}
                    value={values.password}
                  />
                  <FormErrorDisplay msg={errors.password} />
                  <TextField
                    name='rePassword'
                    type={'password'}
                    autoComplete='off'
                    label='Nhập lại mật khẩu'
                    placeholder='Nhập lại mật khẩu vừa tạo ở trên'
                    onChange={handleChange}
                    value={values.rePassword}
                  />
                  <FormErrorDisplay msg={errors.rePassword} />
                  <LoadingButton
                    id='register-button'
                    type='submit'
                    loading={isProcessing}
                    loadingPosition='start'
                    startIcon={<TouchApp />}
                    variant='contained'
                    sx={{
                      textTransform: 'none',
                      padding: '13px',
                      bgcolor: 'rgb(190,18,90)',
                      '&:hover': {
                        bgcolor: 'rgb(190,18,60)',
                      },
                    }}
                  >
                    {!isProcessing ? (
                      <span className='ml-2 text-lg'>Đăng kí ngay</span>
                    ) : (
                      <span className='ml-2 text-lg'>Đang đăng kí</span>
                    )}
                  </LoadingButton>
                </Stack>
              </div>
              <div id='reptcapchaPopup'></div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default RegisterForm
