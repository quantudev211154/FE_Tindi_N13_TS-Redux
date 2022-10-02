import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { TouchApp } from '@mui/icons-material'

interface IRegisterForm {
  name: string
  phone: string
  password: string
  rePassword: string
}

const RegisterForm = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [registerForm, setRegisterForm] = useState<IRegisterForm>({
    name: '',
    phone: '',
    password: '',
    rePassword: '',
  })

  const onTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let eventTarget = event.target

    if (eventTarget.name === 'phone') {
      const prevPhone = registerForm.phone

      if (
        Number(eventTarget.value) ||
        eventTarget.value === '0' ||
        eventTarget.value === ''
      ) {
        setRegisterForm({
          ...registerForm,
          [eventTarget.name]: eventTarget.value,
        })
      } else {
        setRegisterForm({
          ...registerForm,
          [eventTarget.name]: prevPhone,
        })
      }
    } else {
      setRegisterForm({
        ...registerForm,
        [eventTarget.name]: eventTarget.value,
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
          <TextField
            sx={{ mb: 2 }}
            name='name'
            type='text'
            required
            label='Nhập tên bạn muốn hiển thị'
            placeholder='VD: Nguyễn Thy Thy'
            autoFocus
            onChange={onTextFieldChange}
            value={registerForm.name}
          />
          <TextField
            sx={{ mb: 2 }}
            name='phone'
            type='text'
            required
            label='Số điện thoại của bạn'
            placeholder='VD: 0387546271'
            onChange={onTextFieldChange}
            value={registerForm.phone}
          />
          <TextField
            sx={{ mb: 2 }}
            name='password'
            type={'password'}
            label='Mật khẩu'
            placeholder='Đừng dùng mật khẩu dễ đoán nhé'
            required
            onChange={onTextFieldChange}
            value={registerForm.password}
          />
          <TextField
            sx={{ mb: 2 }}
            name='rePassword'
            type={'password'}
            label='Nhập lại mật khẩu'
            placeholder='Nhập lại mật khẩu vừa tạo ở trên'
            required
            onChange={onTextFieldChange}
            value={registerForm.rePassword}
          />
          <LoadingButton
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
    </form>
  )
}

export default RegisterForm
