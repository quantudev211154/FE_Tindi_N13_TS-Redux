import { AttachFile, Mood, Send } from '@mui/icons-material'
import { Button, InputAdornment, InputBase, Tooltip } from '@mui/material'
import { useEffect, useRef } from 'react'
import { currentChatNavigationState } from '../../../../../redux/slices/CurrentChatNavigationSlice'
import { useAppSelector } from '../../../../../redux_hooks'

type Props = {}

const ChatFooter = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)

  useEffect(() => {
    openExpandedPanel
      ? (ref.current!.style.width = '80%')
      : (ref.current!.style.width = '66.666667%')
  }, [openExpandedPanel])

  return (
    <div ref={ref} className='w-2/3 py-2 mx-auto flex-initial transition-all'>
      <form className='w-full flex flex-row justify-between items-center'>
        <InputBase
          startAdornment={
            <InputAdornment position='start'>
              <Tooltip title='Thêm biểu tượng'>
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
              </Tooltip>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position='start'>
              <Tooltip title='Đính kèm'>
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
              </Tooltip>
            </InputAdornment>
          }
          sx={{
            border: '2px solid transparent',
            width: '100%',
            borderRadius: '1rem',
            bgcolor: 'white',
            padding: '.8rem 1rem',
            transition: '.2s ease',
            '&.Mui-focused': {
              border: '2px solid #5894f5',
              bgcolor: 'white',
            },
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
