import { LoginOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ILoginForm {
  phone: string
  password: string
}

const LoginForm = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [loginForm, setLoginForm] = useState<ILoginForm>({
    phone: '',
    password: '',
  })

  const onTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let eventTarget = event.target

    if (eventTarget.name === 'phone') {
      const prevPhone = loginForm.phone

      if (
        Number(eventTarget.value) ||
        eventTarget.value === '0' ||
        eventTarget.value === ''
      ) {
        setLoginForm({
          ...loginForm,
          [eventTarget.name]: event.target.value,
        })
      } else {
        setLoginForm({
          ...loginForm,
          [eventTarget.name]: prevPhone,
        })
      }
    } else {
      setLoginForm({
        ...loginForm,
        [eventTarget.name]: event.target.value,
      })
    }
  }

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsProcessing(true)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className='flex flex-col justify-start items-center'>
        <Stack direction='column' sx={{ width: '100%' }}>
          <Stack>
            <TextField
              sx={{ mb: 2 }}
              name='phone'
              type='text'
              required
              label='Số điện thoại'
              autoFocus
              onChange={onTextFieldChange}
              value={loginForm.phone}
            />
            <p></p>
          </Stack>
          <Stack>
            <TextField
              sx={{ mb: 2 }}
              name='password'
              type='password'
              label='Mật khẩu'
              required
              onChange={onTextFieldChange}
              value={loginForm.password}
            />
            <span></span>
          </Stack>
          <Link to='/forget-pwd' className='text-blue-700 hover:underline mb-3'>
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
  )
}

export default LoginForm
