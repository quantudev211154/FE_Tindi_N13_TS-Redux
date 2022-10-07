import { Button } from '@mui/material'
import LeftChat from './left_chat/LeftChat'
import RightChat from './right_chat/RightChat'

const Chat = () => {
  return (
    <Button
      variant='contained'
      sx={{
        textTransform: 'none',
        padding: '0.2rem 0.5rem',
        borderRadius: '1rem',
        backgroundColor: 'white',
        textAlign: 'none',
        transition: '0.2s ease',
        '&:hover': {
          backgroundColor: '#f2f0f0',
        },
      }}
      disableElevation
      className='bg-slate-200'
    >
      <LeftChat />
      <RightChat />
    </Button>
  )
}

export default Chat
