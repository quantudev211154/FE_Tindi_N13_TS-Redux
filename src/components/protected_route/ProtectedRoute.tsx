import { Backdrop, CircularProgress } from '@mui/material'
import { authActions, authState } from '../../redux/slices/AuthSlice'
import { useAppDispatch, useAppSelector } from '../../redux_hooks'
import { Navigate } from 'react-router-dom'
import { ReactNode, useEffect } from 'react'
import { checkAuth } from '../../redux/thunks/AuthThunks'
import { CheckAuthPayload } from '../../redux/types/AuthTypes'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthLoading, isAuth } = useAppSelector(authState)
  const { reloadCurrentUser } = authActions
  const dispatch = useAppDispatch()

  useEffect(() => {
    const payload: CheckAuthPayload = {
      dispatch: dispatch,
      reloadUser: reloadCurrentUser,
    }

    dispatch(checkAuth(payload))
  }, [isAuth])

  if (isAuthLoading) {
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
        <CircularProgress color='warning' />
        <p className='text-lg mt-5 text-gray-200'>
          <span>Chờ</span>
          <span className='font-bold'> TINDI </span>
          <span>một tí nhé...</span>
        </p>
      </Backdrop>
    )
  }

  if (!isAuth) return <Navigate to='/login' />

  return <>{children}</>
}

export default ProtectedRoute
