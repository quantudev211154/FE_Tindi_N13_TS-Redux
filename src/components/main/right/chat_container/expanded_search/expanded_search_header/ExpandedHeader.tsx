import { CalendarTodayOutlined, Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import {
  currentChatNavigationState,
  toggleExpandedPanel,
} from '../../../../../../redux/slices/CurrentChatNavigationSlice'
import { useAppDispatch, useAppSelector } from '../../../../../../redux_hooks'

type Props = {}

const ExpandedHeader = (props: Props) => {
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)
  const dispatch = useAppDispatch()

  return (
    <div className='w-[90%] mx-auto flex flex-row justify-between items-center'>
      <Button
        onClick={() => {
          dispatch(toggleExpandedPanel(openExpandedPanel ? false : true))
        }}
        type='submit'
        variant='contained'
        sx={{
          maxWidth: '2.5rem',
          maxHeight: '2.5rem',
          minWidth: '2.5rem',
          minHeight: '2.5rem',
          borderRadius: '50%',
          mr: 1,
          bgcolor: 'white',
          '&:hover': {
            bgcolor: '#eeeee4',
            '& svg': {
              fill: 'black',
            },
          },
        }}
        disableElevation
      >
        <Close
          sx={{
            fill: 'gray',
            cursor: 'pointer',
          }}
        />
      </Button>
      <Button
        type='submit'
        variant='contained'
        sx={{
          maxWidth: '2.5rem',
          maxHeight: '2.5rem',
          minWidth: '2.5rem',
          minHeight: '2.5rem',
          borderRadius: '50%',
          ml: 1,
          bgcolor: 'white',
          '&:hover': {
            bgcolor: '#eeeee4',
            '& svg': {
              fill: 'black',
            },
          },
        }}
        disableElevation
      >
        <CalendarTodayOutlined
          sx={{
            fill: 'gray',
            cursor: 'pointer',
          }}
        />
      </Button>
    </div>
  )
}

export default ExpandedHeader
