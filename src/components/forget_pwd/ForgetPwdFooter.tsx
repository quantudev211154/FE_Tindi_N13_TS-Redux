import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'

const ForgetPwdFooter = () => {
  return (
    <Stack>
      <Link
        to='/login'
        className='text-center mt-5 text-blue-700 hover:underline'
      >
        Quay lại đăng nhập
      </Link>
    </Stack>
  )
}

export default ForgetPwdFooter
