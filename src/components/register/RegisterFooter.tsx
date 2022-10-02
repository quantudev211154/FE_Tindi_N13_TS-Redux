import { Link } from 'react-router-dom'

const RegisterFooter = () => {
  return (
    <div className='w-full text-center mt-5'>
      <span>Bạn đã có tài khoản rồi?</span>
      <Link to='/login'>
        <span className='text-center text-blue-700 font-semibold hover:underline'>
          {' '}
          Đăng nhập thôi?
        </span>
      </Link>
    </div>
  )
}

export default RegisterFooter
