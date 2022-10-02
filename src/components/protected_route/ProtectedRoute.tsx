import { Backdrop, CircularProgress } from '@mui/material'
import { authState } from '../../redux/slices/AuthSlice'
import { useAppSelector } from '../../redux_hooks'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthLoading, isAuth } = useAppSelector(authState)

  if (isAuthLoading)
    return (
      <Backdrop
        sx={{
          color: '#fff',
          bgcolor: '#0e6f9c',
          display: 'flex',
          flexDirection: 'column',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isAuthLoading}
      >
        <CircularProgress color='secondary' />
        <p className='text-lg mt-5 text-gray-200'>
          <span>Chờ</span>
          <span className='font-bold'> TINDI </span>
          <span>một tí nhé...</span>
        </p>
      </Backdrop>
    )

  if (!isAuth) return <Navigate to='/login' />

  return <>{children}</>
}

export default ProtectedRoute
