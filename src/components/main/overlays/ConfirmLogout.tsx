import { Button } from '@mui/material'
import { authActions } from '../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../redux/slices/ControlOverlaysSlice'
import { useAppDispatch } from './../../../redux_hooks'

const ConfirmLogout = () => {
  const { toggleConfirmLogoutOverlay } = controlOverlaysActions
  const { logout } = authActions
  const dispatch = useAppDispatch()

  return (
    <div className='rounded-lg p-10 z-[500] text-center'>
      <p className='text-2xl font-semibold'>Cần xác nhận lại</p>
      <p className='mt-1'>Bạn thật sự muốn đăng xuất chứ?</p>
      <div className='w-full mt-8 flex justify-center items-center'>
        <Button
          variant='contained'
          disableElevation
          sx={{
            textTransform: 'none',
            mr: 2,
            bgcolor: '#878384',
            fontSize: '1rem',
            '&:hover': {
              bgcolor: '#d11137',
            },
          }}
          onClick={() => {
            dispatch(logout())
            dispatch(toggleConfirmLogoutOverlay())
          }}
        >
          Đăng xuất
        </Button>
        <Button
          variant='contained'
          disableElevation
          sx={{
            textTransform: 'none',
            mr: 2,
            bgcolor: '#145dc9',
            fontSize: '1rem',
            '&:hover': {
              bgcolor: '#0a4091',
            },
          }}
          onClick={() => {
            dispatch(toggleConfirmLogoutOverlay())
          }}
        >
          Đùa thôi
        </Button>
      </div>
    </div>
  )
}

export default ConfirmLogout
