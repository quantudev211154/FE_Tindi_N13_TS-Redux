import { AttachFile, Mood, Send } from '@mui/icons-material'
import { Button, InputAdornment, InputBase } from '@mui/material'

type Props = {}

const ChatFooter = (props: Props) => {
  return (
    <div className='w-2/3 py-2 mx-auto flex-initial'>
      <form className='w-full flex flex-row justify-between items-center'>
        <InputBase
          endAdornment={
            <InputAdornment position='start'>
              <Button
                variant='contained'
                sx={{
                  maxWidth: '2.5rem',
                  maxHeight: '2.5rem',
                  minWidth: '2.5rem',
                  minHeight: '2.5rem',
                  borderRadius: '50%',
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: '#eeeee4',
                  },
                }}
                disableElevation
              >
                <AttachFile
                  sx={{
                    fill: 'gray',
                    cursor: 'pointer',
                  }}
                />
              </Button>
            </InputAdornment>
          }
          startAdornment={
            <InputAdornment position='start'>
              <Button
                variant='contained'
                sx={{
                  maxWidth: '2.5rem',
                  maxHeight: '2.5rem',
                  minWidth: '2.5rem',
                  minHeight: '2.5rem',
                  borderRadius: '50%',
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: '#eeeee4',
                  },
                }}
                disableElevation
              >
                <Mood
                  sx={{
                    fill: 'gray',
                    cursor: 'pointer',
                  }}
                />
              </Button>
            </InputAdornment>
          }
          sx={{
            width: '100%',
            borderRadius: '1rem',
            bgcolor: 'white',
            padding: '.8rem 1rem',
          }}
          placeholder='Viết tin nhắn nào...'
          type='text'
        />
        <Button
          type='submit'
          variant='contained'
          sx={{
            maxWidth: '3.5rem',
            maxHeight: '3.5rem',
            minWidth: '3.5rem',
            minHeight: '3.5rem',
            borderRadius: '50%',
            ml: 1,
            bgcolor: 'white',
            '&:hover': {
              bgcolor: '#318eeb',
              '& svg': {
                fill: 'white',
              },
            },
          }}
          disableElevation
        >
          <Send
            sx={{
              fill: 'gray',
              cursor: 'pointer',
            }}
          />
        </Button>
      </form>
    </div>
  )
}

export default ChatFooter
