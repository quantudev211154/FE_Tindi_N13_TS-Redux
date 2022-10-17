import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Stack, TextField } from '@mui/material'
import { TouchApp } from '@mui/icons-material'
import { Formik } from 'formik'
import FormErrorDisplay from '../core/FormErrorDisplay'
import { RegisterFormValidateShape } from './RegisterFormValidateShape'
import { useAppDispatch } from '../../redux_hooks'
import { register } from '../../redux/thunks/AuthThunks'
import { RegisterPayloadType } from '../../redux/types/AuthTypes'
import { useNavigate } from 'react-router-dom'

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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onFormSubmit = async (values: IRegisterForm) => {
    const convertedRegisterPayload: RegisterPayloadType = {
      phone: values.phone,
      password: values.password,
      fullName: values.name,
    }

    dispatch(register(convertedRegisterPayload))

    navigate('/login')
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={RegisterFormValidateShape}
    >
      {({ handleSubmit, values, handleChange, errors }) => (
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
              />
              <FormErrorDisplay msg={errors.phone} />
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
      )}
    </Formik>
  )
}

export default RegisterForm
