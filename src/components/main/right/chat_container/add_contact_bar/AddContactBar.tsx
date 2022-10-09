import { Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useRef } from 'react'

type Props = {}

const AddContactBar = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const closeAddContactBar = () => {
    ref.current!.style.display = 'none'
  }

  return (
    <div
      ref={ref}
      className='w-full bg-white px-8 py-2 flex items-center justify-between shadow-md z-20 transition-all'
    >
      <Button
        variant='contained'
        fullWidth={true}
        sx={{
          bgcolor: 'white',
          color: '#1670c4',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: '#e6f0fa',
          },
        }}
        disableElevation
        onClick={closeAddContactBar}
      >
        <span>Thêm liên hệ mới</span>
      </Button>
      <Button
        variant='contained'
        sx={{
          maxWidth: '2.5rem',
          maxHeight: '2.5rem',
          minWidth: '2.5rem',
          minHeight: '2.5rem',
          borderRadius: '50%',
          ml: 2,
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: '#eeeee4',
          },
        }}
        disableElevation
        onClick={closeAddContactBar}
      >
        <Close sx={{ fill: 'gray', width: 26, height: 26 }} />
      </Button>
    </div>
  )
}

export default AddContactBar
