import { RestartAltOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormErrorDisplay from '../core/FormErrorDisplay'
import { useEffect, useState } from 'react'
import { FirebaseService } from '../../services/FirebaseAuth'
import { API_CHECK_EXISTING_PHONE } from '../../constants/APIConstant'
import http from '../../utilities/http/Http'
interface IForgetPwd {
  phone: string
}

const initialValuesOfForgetPwd: IForgetPwd = {
  phone: '',
}

type Props = {
  openOTPField: Function
  setCurrentPhone: Function
}

const ForgetPwdForm = ({ openOTPField, setCurrentPhone }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [phoneErr, setPhoneErr] = useState('')

  useEffect(() => {
    FirebaseService.generateRecaptchatVerifier('reptcapchaPopup')
  }, [])

  const onPhoneFieldEnough10Characters = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value.length === 10) {
      try {
        await http.get(API_CHECK_EXISTING_PHONE + event.target.value)

        setPhoneErr(
          'Chúng tôi chưa ghi nhận tài khoản Tindi dùng số điện thoại này. Có thể bạn đã nhầm rồi!'
        )
      } catch (error) {
        setPhoneErr('')
      }
    } else {
      setPhoneErr('')
    }
  }

  const onSubmitForm = (values: IForgetPwd) => {
    if (!phoneErr) {
      setIsProcessing(true)

      FirebaseService.sendFirebaseAuthOTP(values.phone)

      setCurrentPhone(values.phone)
      openOTPField(true)

      const tmpTimeout = window.setTimeout(() => {
        setIsProcessing(false)
        window.clearTimeout(tmpTimeout)
      }, 3000)
    }
  }

  return (
    <Formik
      initialValues={initialValuesOfForgetPwd}
      onSubmit={onSubmitForm}
      validationSchema={yup.object({
        phone: yup
          .string()
          .required(
            'Không nhập số điện thoại là không lấy lại tài khoản được đâu'
          )
          .matches(
            /^(0[3|5|7|8|9])+([0-9]{8})$/,
            'Số điện thoại phải dài đủ 10 kí tự và bắt đầu bằng các đầu số của Việt Nam (03|05|07|08|09)'
          ),
      })}
    >
      {({ handleSubmit, values, handleChange, errors }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Stack direction='column' sx={{ width: '100%' }}>
              <TextField
                name='phone'
                type='text'
                required
                label='Nhập số điện thoại của bạn'
                placeholder='Số điện thoại bạn đã dùng để đăng kí tài khoản'
                autoFocus
                onChange={(e) => {
                  handleChange(e)
                  onPhoneFieldEnough10Characters(e)
                }}
                value={values.phone}
              />
              <FormErrorDisplay msg={errors.phone} />
              <FormErrorDisplay
                msg={phoneErr}
                sx={{ transform: 'translate(0, -1rem)' }}
              />
              <LoadingButton
                id='register-button'
                type='submit'
                loading={isProcessing}
                loadingPosition='start'
                startIcon={<RestartAltOutlined />}
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
                  <span className='ml-2 text-lg'>Nhận mã xác thực</span>
                ) : (
                  <span className='ml-2 text-lg'>Đang gửi mã xác thực</span>
                )}
              </LoadingButton>
              <div id='reptcapchaPopup'></div>
            </Stack>
          </form>
        )
      }}
    </Formik>
  )
}

export default ForgetPwdForm
