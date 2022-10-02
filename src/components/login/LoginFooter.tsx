import { Link } from 'react-router-dom'

const LoginFooter = () => {
  return (
    <div className='w-full text-center mt-5'>
      <span>Chưa có tài khoản?</span>
      <Link to='/register'>
        <span className='text-center text-rose-700 font-semibold hover:underline'>
          {' '}
          Đăng kí ngay nào?
        </span>
      </Link>
    </div>
  )
}

export default LoginFooter
