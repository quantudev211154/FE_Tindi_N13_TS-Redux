import { LoginOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Collapse, Stack, TextField } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../redux/thunks/AuthThunks'
import { LoginPayloadType } from '../../redux/types/AuthTypes'
import { ErrorType } from '../../redux/types/ErrorType'
import { useAppDispatch } from '../../redux_hooks'
import FormErrorDisplay from '../core/FormErrorDisplay'
import { LoginFormValidateShape } from './LoginFormValidateShape'

interface ILoginForm {
  phone: string
  password: string
}

const initialValues: ILoginForm = {
  phone: '',
  password: '',
}

const LoginForm = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const dispatch = useAppDispatch()
  const [loginErrorMsg, setLoginErrorMsg] = useState({
    isError: false,
    errTitle: '',
    errMsg: '',
  })
  let timeoutToHideAlert: number = -999

  const onFormSubmit = async (values: ILoginForm) => {
    setIsProcessing(true)

    const data: LoginPayloadType = {
      phone: values.phone,
      password: values.password,
    }

    const loginResult = await dispatch(login(data))

    if ((loginResult.payload as ErrorType).message.includes('403')) {
      setIsProcessing(false)
      setLoginErrorMsg((prev) => ({
        ...prev,
        isError: true,
        errTitle: 'Lỗi rồi',
        errMsg: 'Tên đăng nhập hoặc mật khẩu không đúng! Hãy thử lại!',
      }))

      timeoutToHideAlert = window.setTimeout(() => {
        setLoginErrorMsg((prev) => ({
          ...prev,
          isError: false,
        }))
        clearTimeout(timeoutToHideAlert)
      }, 8000)
    } else {
      setIsProcessing(false)
      setLoginErrorMsg((prev) => ({
        ...prev,
        isError: true,
        errTitle: 'Máy chủ của chúng tôi đang bị ốm',
        errMsg:
          'Có một chút sự cố xảy ra với máy chủ của chúng tôi. Nào ta cùng chơi một bài nhạc hay hay nào đó và quay lại sau ít phút nhé!',
      }))

      timeoutToHideAlert = window.setTimeout(() => {
        setLoginErrorMsg((prev) => ({
          ...prev,
          isError: false,
        }))
        clearTimeout(timeoutToHideAlert)
      }, 8000)
    }
  }

  return (
    <div>
      <Collapse in={loginErrorMsg.isError} sx={{ mb: 2 }}>
        <Alert severity='error'>
          <AlertTitle>{loginErrorMsg.errTitle}</AlertTitle>
          <span>{loginErrorMsg.errMsg}</span>
        </Alert>
      </Collapse>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={LoginFormValidateShape}
      >
        {({ handleSubmit, values, handleChange, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col justify-start items-center'>
              <Stack direction='column' sx={{ width: '100%' }}>
                <Stack>
                  <TextField
                    name='phone'
                    type='text'
                    label='Số điện thoại'
                    autoFocus
                    autoComplete='off'
                    onChange={handleChange}
                    value={values.phone}
                  />
                  <FormErrorDisplay msg={errors.phone} />
                </Stack>
                <Stack>
                  <TextField
                    name='password'
                    type='password'
                    label='Mật khẩu'
                    onChange={handleChange}
                    value={values.password}
                  />
                  <FormErrorDisplay msg={errors.password} />
                </Stack>
                <Link
                  to='/forget-pwd'
                  className='text-blue-700 hover:underline mb-3'
                >
                  Quên mật khẩu
                </Link>
                <LoadingButton
                  type='submit'
                  loading={isProcessing}
                  loadingPosition='start'
                  startIcon={<LoginOutlined />}
                  variant='contained'
                  sx={{ textTransform: 'none', padding: '13px' }}
                >
                  {!isProcessing ? (
                    <span className='ml-2 text-lg'>Đăng nhập</span>
                  ) : (
                    <span className='ml-2 text-lg'>Đang đăng nhập</span>
                  )}
                </LoadingButton>
              </Stack>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
