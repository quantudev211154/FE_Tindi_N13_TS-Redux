import NotFoundBgr from '../assets/NotFoundBgr.png'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { DirectionsRun } from '@mui/icons-material'

const NotFound = () => {
  return (
    <div className='relative w-full h-screen'>
      <figure className='w-full h-full'>
        <img
          src={NotFoundBgr}
          className='w-full h-full object-cover'
          alt='Không tìm thấy trang này.'
        />
      </figure>
      <div className='absolute bottom-[12%] left-1/2 transform -translate-x-1/2 text-center'>
        <p className='text-3xl font-semibold'>Ôi bạn ơi! Bạn đi lạc rồi.</p>
        <p className='text-lg mt-1'>Tindi không tìm thấy trang này.</p>
        <Link to='/'>
          <Button
            startIcon={<DirectionsRun />}
            color='secondary'
            variant='contained'
            sx={{ textTransform: 'none', py: 2, mt: 2 }}
          >
            <span className='text-lg'>Về trang chủ thôi</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
