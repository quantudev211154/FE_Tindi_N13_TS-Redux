import { Formik } from 'formik'
import { Link, NavigateFunction } from 'react-router-dom'
import ConfirmPhoneBgr from '../assets/confirm-phone-bgr.webp'
import * as yup from 'yup'
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  Stack,
  TextField,
} from '@mui/material'
import FormErrorDisplay from '../components/core/FormErrorDisplay'
import { ArrowBack, Security } from '@mui/icons-material'
import { FirebaseAuthService } from '../services/FirebaseAuth'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'

type Props = {
  navigate: NavigateFunction
  goBack: Function
}

interface IConfirmPhone {
  code: string
}

const initialValues: IConfirmPhone = {
  code: '',
}

const ConfirmPhone = ({ navigate, goBack }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [collapseProps, setCollapseProps] = useState({
    in: false,
    status: false,
    title: 'Lỗi rỗi',
    msg: 'Mã code bạn cung cấp không đúng',
  })
  let dfTimeToRedirect = 4
  let intervalToDetermineRemainingTime = -1
  let timeoutToRedirect = -1

  const onFormSubmit = async (values: IConfirmPhone) => {
    FirebaseAuthService.getConfirmationResult()
      .confirm(values.code)
      .then((result: any) => {
        setCollapseProps({
          ...collapseProps,
          in: true,
          status: true,
          title: 'Bạn đã đăng ký thành công tài khoản Tindi.',
          msg: 'Bạn sẽ được chuyển sang trang đăng nhập sau 3s nữa.',
        })

        intervalToDetermineRemainingTime = window.setInterval(() => {
          setCollapseProps({
            ...collapseProps,
            in: true,
            status: true,
            title: 'Bạn đã đăng ký thành công tài khoản Tindi.',
            msg: `Bạn sẽ được chuyển sang trang đăng nhập sau ${
              dfTimeToRedirect - 1
            }s nữa.`,
          })

          --dfTimeToRedirect
        }, 1000)

        timeoutToRedirect = window.setTimeout(() => {
          window.clearTimeout(timeoutToRedirect)
          window.clearInterval(intervalToDetermineRemainingTime)
          navigate('/login')
        }, 4000)
      })
      .catch((err: any) => {
        console.log(err)
        setIsProcessing(false)
        setCollapseProps({
          ...collapseProps,
          in: true,
          status: false,
          title: 'Không ổn rồi',
          msg: 'Mã xác thực mà bạn cung cấp không đúng. Hãy nhập lại.',
        })
      })
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
                ),
            })}
          >
            {({ handleSubmit, values, handleChange, errors }) => (
              <form onSubmit={handleSubmit}>
                <Stack direction='column' sx={{ width: '100%' }}>
                  <TextField
                    name='code'
                    type='text'
                    autoComplete='off'
                    label='Nhập mã xác thực'
                    placeholder='Điền mã xác thực của bạn tại đây'
                    autoFocus
                    onChange={(e) => {
                      setCollapseProps({
                        ...collapseProps,
                        in: false,
                      })
                      handleChange(e)
                    }}
                    value={values.code}
                  />
                  <FormErrorDisplay msg={errors.code} />
                  <LoadingButton
                    type='submit'
                    loading={isProcessing}
                    loadingPosition='start'
                    startIcon={<Security />}
                    variant='contained'
                    onClick={() => {
                      setIsProcessing(true)
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
                      <span className='ml-2 text-lg'>Xác thực</span>
                    ) : (
                      <span className='ml-2 text-lg'>
                        Đang xác thực mã OTP của bạn
                      </span>
                    )}
                  </LoadingButton>
                </Stack>
              </form>
            )}
          </Formik>
          <div
            onClick={() => {
              goBack()
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
