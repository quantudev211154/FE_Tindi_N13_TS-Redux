import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoute from './components/protected_route/ProtectedRoute'
import Register from './pages/Register'
import ForgetPwd from './pages/ForgetPwd'
import NotFound from './pages/NotFound'
import Main from './pages/Main'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './redux_hooks'
import { CircularProgress } from '@mui/material'
import { checkAuth } from './redux/thunks/AuthThunks'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const authenticate = async () => {
      await dispatch(checkAuth())

      setLoading(false)
    }

    authenticate()
  }, [])

  if (loading) return <CircularProgress color='secondary' />

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forget-pwd' element={<ForgetPwd />} />
          <Route
            path=''
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
