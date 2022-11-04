import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import ConfirmPhoneBgr from '../assets/confirm-phone-bgr.webp'
import * as yup from 'yup'
import { Alert, AlertTitle, Collapse, Stack, TextField } from '@mui/material'
import { ArrowBack, RepeatOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch } from '../redux_hooks'
import { FirebaseService } from '../services/FirebaseAuth'
import { login, register } from '../redux/thunks/AuthThunks'
import {
  RegistrationPendingAccount,
  RegistrationPendingType,
} from '../utilities/registration/RegistrationPending'
import { LoginPayloadType, RegisterPayloadType } from '../redux/types/AuthTypes'
import FormErrorDisplay from '../components/core/FormErrorDisplay'

interface IConfirmPhone {
  code: string
}

const initialValues: IConfirmPhone = {
  code: '',
}

const ConfirmPhone = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isProcessing, setIsProcessing] = useState(false)
  const [collapseProps, setCollapseProps] = useState({
    in: false,
    status: false,
    title: 'Lỗi rỗi',
    msg: 'Mã code bạn cung cấp không đúng',
  })
  let [isOTPFieldDisabled, setOTPFieldDisabled] = useState(false)
  let dfTimeToRedirect = 4
  let intervalToDetermineRemainingTime = -1
  let timeoutToRedirect = -1

  useEffect(() => {
    document.title = 'Xác nhận số điện thoại'

    FirebaseService.generateRecaptchatVerifier('recaptchatPopup')
  }, [])

  const onConfirmPhoneSuccess = () => {
    setOTPFieldDisabled(true)
    setCollapseProps({
      ...collapseProps,
      in: true,
      status: true,
      title: 'Bạn đã đăng ký thành công tài khoản Tindi.',
      msg: 'Bạn sẽ được chuyển sang màn hình chính sau 3s nữa.',
    })

    const preLoginAccount =
      RegistrationPendingAccount.getPendingRegisterAccount() as RegistrationPendingType

    const data: LoginPayloadType = {
      phone: preLoginAccount.phone,
      password: preLoginAccount.password,
    }
    dispatch(login(data))

    intervalToDetermineRemainingTime = window.setInterval(() => {
      setCollapseProps({
        ...collapseProps,
        in: true,
        status: true,
        title: 'Bạn đã đăng ký thành công tài khoản Tindi.',
        msg: `Bạn sẽ được chuyển sang màn hình chính sau ${
          dfTimeToRedirect - 1
        }s nữa.`,
      })

      --dfTimeToRedirect
    }, 1000)

    dispatch(
      register(
        RegistrationPendingAccount.getPendingRegisterAccount() as RegisterPayloadType
      )
    )

    timeoutToRedirect = window.setTimeout(() => {
      window.clearTimeout(timeoutToRedirect)
      window.clearInterval(intervalToDetermineRemainingTime)

      navigate('/')
    }, 4000)
  }

  const onConfirmPhoneFailure = () => {
    setOTPFieldDisabled(false)
    setCollapseProps({
      ...collapseProps,
      in: true,
      status: false,
      title: 'Không ổn rồi',
      msg: 'Mã xác thực mà bạn cung cấp không đúng. Hãy nhập lại.',
    })
  }

  const onFormSubmit = async (values: IConfirmPhone) => {
    FirebaseService.confirmFirebaseAuthOTP(
      values.code,
      onConfirmPhoneSuccess,
      onConfirmPhoneFailure
    )
  }

  const onOTPFieldChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCollapseProps({
      ...collapseProps,
      in: false,
    })

    const customCode: IConfirmPhone = {
      code: event.target.value,
    }
    if (event.target.value.length === 6) {
      setOTPFieldDisabled(true)
      onFormSubmit(customCode)
    }
  }

  return (
    <div className='w-full bg-white h-screen flex justify-between items-center'>
      <div className='w-1/2 h-full relative'>
        <div className='absolute w-2/3 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
          <div className='mb-8'>
            <p className='mb-5 text-3xl text-blue-800 font-semibold'>
              Tindi xác thực
            </p>
            <p className='text-slate-700 mb-1'>
              Tindi đã gửi về số điện thoại của bạn một mã xác nhận.
            </p>
            <p className='text-slate-700'>
              Mời bạn nhập mã xác nhận đó vào ô bên dưới để Tindi tin rằng bạn
              không phải là người máy nhé!
            </p>
          </div>
          <Collapse in={collapseProps.in} sx={{ mb: 1 }}>
            <Alert severity={!collapseProps.status ? 'error' : 'success'}>
              <AlertTitle>{collapseProps.title}</AlertTitle>
              <span>{collapseProps.msg}</span>
            </Alert>
          </Collapse>
          <Formik
            initialValues={initialValues}
            onSubmit={onFormSubmit}
            validationSchema={yup.object({
              code: yup
                .string()
                .required(
                  'Đừng bỏ trống trường này bạn nhé. Không điền là không đăng ký tài khoản được đâu.'
                )
                .min(6, 'Mã OTP cần phải có đủ 6 kí tự mới được cơ!')
                .max(
                  6,
                  'Mã OTP chỉ có 6 kí tự thôi. Đừng cố nhập thêm nữa bạn ơi!'
                ),
            })}
          >
            {({ handleSubmit, values, handleChange, errors }) => (
              <form onSubmit={handleSubmit}>
                <Stack direction='column' sx={{ width: '100%' }}>
                  <TextField
                    disabled={isOTPFieldDisabled}
                    name='code'
                    type='text'
                    autoComplete='off'
                    label='Nhập mã xác thực'
                    placeholder='Điền mã xác thực của bạn tại đây'
                    autoFocus
                    onChange={(e) => {
                      onOTPFieldChange(e)
                      handleChange(e)
                    }}
                    value={values.code}
                  />
                  <FormErrorDisplay msg={errors.code} />
                  <LoadingButton
                    loading={isProcessing}
                    loadingPosition='start'
                    startIcon={<RepeatOutlined />}
                    variant='contained'
                    onClick={() => {
                      setIsProcessing(true)
                      FirebaseService.sendFirebaseAuthOTP(
                        RegistrationPendingAccount.getPendingRegisterAccount()
                          ?.phone as string
                      )

                      const t = window.setTimeout(() => {
                        setIsProcessing(false)
                        window.clearTimeout(t)
                      }, 3000)
                    }}
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
                      <span className='ml-2 text-lg'>Gửi lại mã OTP</span>
                    ) : (
                      <span className='ml-2 text-lg'>Đang gửi lại mã OTP</span>
                    )}
                  </LoadingButton>
                </Stack>
              </form>
            )}
          </Formik>
          <div
            onClick={() => {
              navigate('/register')
            }}
            className='cursor-pointer mt-10 transition-all flex items-center justify-center border border-dashed border-white px-3 py-2 hover:border-blue-700'
          >
            <ArrowBack sx={{ fill: 'rgb(30,64,175)' }} />
            <span className='ml-1 text-blue-800 text-lg font-medium translate-x-0'>
              Quay lại
            </span>
          </div>
        </div>
      </div>
      <div id='recaptchatPopup'></div>
      <figure className='w-1/2 h-full'>
        <img
          src={ConfirmPhoneBgr}
          className='w-full h-full object-cover'
          alt='Confirm your phone number illustration'
        />
      </figure>
    </div>
  )
}

export default ConfirmPhone
