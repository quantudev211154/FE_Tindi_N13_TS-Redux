import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoute from './components/protected_route/ProtectedRoute'
import Register from './pages/Register'
import ForgetPwd from './pages/ForgetPwd'
import NotFound from './pages/NotFound'
import Main from './pages/Main'
import ConfirmPhone from './pages/ConfirmPhone'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/confirm-phone' element={<ConfirmPhone />} />
          <Route path='/forget-pwd' element={<ForgetPwd />} />
          <Route
            path=''
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          ></Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
