import { ArrowBack } from '@mui/icons-material'
import { Button, Stack, TextField } from '@mui/material'
import { Formik } from 'formik'
import FormErrorDisplay from '../../../../../core/FormErrorDisplay'
import * as yup from 'yup'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../redux_hooks'
import { authState } from '../../../../../../redux/slices/AuthSlice'
import { changePwd, checkValidPassword } from '../../../../../../api/User.api'
import { showMessageHandlerResultToSnackbar } from '../../../../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import { messageContextmenuActions } from '../../../../../../redux/slices/MessageContextmenuSlice'

type Props = {
  returnToMainSetting: Function
}

type ChangePwdType = {
  oldPwd: string
  newPwd: string
}

const initialValue: ChangePwdType = {
  oldPwd: '',
  newPwd: '',
}

const ChangePwd = ({ returnToMainSetting }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const [oldPwdError, setOldPwdError] = useState('')
  let timerToCheckPwd: number | undefined = undefined
  const dispatch = useAppDispatch()
  const { setHandlerResult } = messageContextmenuActions

  const onOldPwdFieldChange = (oldPwd: string) => {
    window.clearTimeout(timerToCheckPwd)
    setOldPwdError('')

    timerToCheckPwd = window.setTimeout(async () => {
      if (currentUser && oldPwd !== '') {
        try {
          await checkValidPassword(currentUser.phone, oldPwd)

          setOldPwdError('')
        } catch (error) {
          setOldPwdError('Mật khẩu cũ không hợp lệ')
        }
      }
    }, 800)
  }

  const onFormSubmit = async (values: ChangePwdType) => {
    if (oldPwdError === '' && currentUser) {
      try {
        await changePwd(currentUser.phone, values.oldPwd, values.newPwd)

        showMessageHandlerResultToSnackbar(
          true,
          'Đã thay đổi mật khẩu thành công',
          dispatch,
          setHandlerResult
        )

        returnToMainSetting()
      } catch (error) {
        showMessageHandlerResultToSnackbar(
          false,
          'Mật khẩu cũ của bạn không hợp lệ hoặc máy chủ đang có vấn đề. Thử lại nhé!',
          dispatch,
          setHandlerResult
        )
      }
    }
  }

  return (
    <div className='bg-white'>
      <div className='px-5 py-3 w-full flex justify-start items-center'>
        <Button
          onClick={() => {
            returnToMainSetting()
          }}
          variant='contained'
          sx={{
            maxWidth: '2.5rem',
            maxHeight: '2.5rem',
            minWidth: '2.5rem',
            minHeight: '2.5rem',
            borderRadius: '50%',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: '#eeeee4',
            },
          }}
          disableElevation
        >
          <ArrowBack sx={{ fill: 'gray', width: 26, height: 26 }} />
        </Button>
        <span className='font-medium text-lg ml-3'>Đổi mật khẩu</span>
      </div>
      <div className='px-5 py-3'>
        <Formik
          initialValues={initialValue}
          onSubmit={onFormSubmit}
          validationSchema={yup.object({
            oldPwd: yup.string().required('Hãy nhập mật khẩu hiện tại của bạn'),
            newPwd: yup
              .string()
              .required('Hãy nhập mật khẩu mà bạn muốn đổi')
              .min(6, 'Mật khẩu cần có ít nhất 6 kí tự cơ!'),
          })}
        >
          {({ handleSubmit, values, handleChange, errors }) => (
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col justify-start items-center'>
                <Stack direction='column' sx={{ width: '100%' }} spacing={2}>
                  <Stack>
                    <TextField
                      variant='outlined'
                      name='oldPwd'
                      type='password'
                      label='Mật khẩu cũ'
                      placeholder='Mật khẩu hiện tại của bạn'
                      autoFocus
                      autoComplete='off'
                      onChange={(e) => {
                        handleChange(e)
                        onOldPwdFieldChange(e.target.value)
                      }}
                      value={values.oldPwd}
                    />
                    <FormErrorDisplay msg={errors.oldPwd} sx={{ mb: 0 }} />
                    {oldPwdError !== '' ? (
                      <FormErrorDisplay
                        msg={'Mật khẩu cũ không hợp lệ'}
                        sx={{ mb: 0 }}
                      />
                    ) : (
                      <></>
                    )}
                  </Stack>
                  <Stack>
                    <TextField
                      name='newPwd'
                      type='password'
                      label='Mật khẩu mới'
                      placeholder='Mật khẩu mà bạn muốn thay đổi'
                      onChange={handleChange}
                      value={values.newPwd}
                    />
                    <FormErrorDisplay msg={errors.newPwd} />
                  </Stack>
                </Stack>
              </div>
              <div className='pb-3 flex justify-end items-center'>
                <Button
                  disableElevation
                  onClick={() => {
                    returnToMainSetting()
                  }}
                  variant='contained'
                  sx={{
                    textTransform: 'none',
                    bgcolor: 'transparent',
                    color: '#185a94',
                    '&:hover': { bgcolor: '#cc2f54', color: 'white' },
                  }}
                >
                  Huỷ
                </Button>
                <Button
                  type='submit'
                  disableElevation
                  variant='contained'
                  sx={{
                    textTransform: 'none',
                    bgcolor: 'transparent',
                    color: '#185a94',
                    '&:hover': { bgcolor: '#1472c4', color: 'white' },
                  }}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ChangePwd
