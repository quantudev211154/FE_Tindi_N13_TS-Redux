import { LoginOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import { Link } from 'react-router-dom'
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

  const onFormSubmit = (values: ILoginForm) => {
    console.log(values)

    setIsProcessing(true)
  }

  return (
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
  )
}

export default LoginForm
