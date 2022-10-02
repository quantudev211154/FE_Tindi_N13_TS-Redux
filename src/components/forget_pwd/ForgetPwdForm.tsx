import { RestartAlt } from '@mui/icons-material'
import { Alert, Button, Collapse, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'

const ForgetPwdForm = () => {
  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const onTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let eventTarget = event.target
    const prevPhone = phone

    if (
      Number(eventTarget.value) ||
      eventTarget.value === '0' ||
      eventTarget.value === ''
    ) {
      if (!eventTarget.value.match('^[0-9]{10}$')) {
        setErrorMessage('Số điện thoại phải bao gồm 10 kí tự số!')
        setIsError(true)
      } else {
        setErrorMessage('')
        setIsError(false)
      }

      setPhone(eventTarget.value)
    } else {
      setPhone(prevPhone)
    }
  }

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmitForm}>
      <Stack direction='column' sx={{ width: '100%' }}>
        <TextField
          error={isError}
          name='phone'
          type='text'
          required
          label='Nhập số điện thoại của bạn'
          placeholder='Số điện thoại bạn dùng để đăng kí tài khoản'
          autoFocus
          onChange={onTextFieldChange}
          value={phone}
        />
        <Collapse in={isError && errorMessage !== ''} sx={{ mb: 3 }}>
          <Alert severity='error'>{errorMessage}</Alert>
        </Collapse>
        <Button
          type='submit'
          color='info'
          variant='contained'
          startIcon={<RestartAlt />}
          disabled={isError}
          sx={{ textTransform: 'none', padding: '13px' }}
        >
          <span className='text-lg'>Lấy lại tài khoản</span>
        </Button>
      </Stack>
    </form>
  )
}

export default ForgetPwdForm
