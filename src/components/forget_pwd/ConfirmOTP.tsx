import { ArrowBack, RestartAltOutlined, Security } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Collapse, Stack, TextField } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { login } from '../../redux/thunks/AuthThunks'
import { LoginPayloadType } from '../../redux/types/AuthTypes'
import { useAppDispatch } from '../../redux_hooks'
import { FirebaseAuthService } from '../../services/FirebaseAuth'
import FormErrorDisplay from '../core/FormErrorDisplay'

interface IConfirmOTP {
  code: string
}

const initialValue: IConfirmOTP = {
  code: '',
}

type Props = {
  phone: string
  openOTPField: Function
}

const ConfirmOTP = ({ phone, openOTPField }: Props) => {
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

  const onConfirmPhoneSuccess = () => {
    setOTPFieldDisabled(true)
    setCollapseProps({
      ...collapseProps,
      in: true,
      status: true,
      title:
        'Đã xác nhận người dùng. Mật khẩu tạm chính là số điện thoại của bạn!',
      msg: 'Bạn sẽ được chuyển sang màn hình chính sau 3s nữa. Nhớ đổi mật khẩu thật nhanh nhé!',
    })

    intervalToDetermineRemainingTime = window.setInterval(() => {
      setCollapseProps({
        ...collapseProps,
        in: true,
        status: true,
        title: 'Đã xác nhận. Mật khẩu tạm chính là số điện thoại của bạn!',
        msg: `Bạn sẽ được chuyển sang màn hình chính sau ${
          dfTimeToRedirect - 1
        }s nữa. Nhớ đổi mật khẩu thật nhanh nhé!`,
      })

      --dfTimeToRedirect
    }, 1000)

    timeoutToRedirect = window.setTimeout(() => {
      const data: LoginPayloadType = {
        phone: phone,
        password: phone,
      }
      dispatch(login(data))

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

  const onFormSubmit = (values: IConfirmOTP) => {
    FirebaseAuthService.confirmFirebaseAuthOTP(
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

    const customCode: IConfirmOTP = {
      code: event.target.value,
    }
    if (event.target.value.length === 6) {
      setOTPFieldDisabled(true)
      onFormSubmit(customCode)
    }
  }

  return (
    <>
      <div>
        <p className='text-3xl font-medium text-center mb-10'>XÁC NHẬN OTP</p>
      </div>
      <div>
        <Collapse in={collapseProps.in} sx={{ mb: 1 }}>
          <Alert severity={!collapseProps.status ? 'error' : 'success'}>
            <AlertTitle>{collapseProps.title}</AlertTitle>
            <span>{collapseProps.msg}</span>
          </Alert>
        </Collapse>
        <Formik
          initialValues={initialValue}
          onSubmit={onFormSubmit}
          validationSchema={yup.object({
            code: yup
              .string()
              .required('Hãy cung cấp mã xác thực mà Tindi đã gửi cho bạn')
              .min(6, 'Mã OTP cần phải có đủ 6 kí tự mới được cơ!')
              .max(6, 'Mã OTP chỉ dài 6 kí tự thôi. Bạn đang nhầm thì phải!'),
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
                  startIcon={<Security />}
                  variant='contained'
                  onClick={() => {
                    setIsProcessing(true)
                    FirebaseAuthService.sendFirebaseAuthOTP(phone)

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
            openOTPField(false)
          }}
          className='cursor-pointer mt-10 transition-all flex items-center justify-center border border-dashed border-white px-3 py-2 hover:border-blue-700'
        >
          <ArrowBack sx={{ fill: 'rgb(30,64,175)' }} />
          <span className='ml-1 text-blue-800 text-lg font-medium translate-x-0'>
            Quay lại
          </span>
        </div>
      </div>
    </>
  )
}

export default ConfirmOTP
