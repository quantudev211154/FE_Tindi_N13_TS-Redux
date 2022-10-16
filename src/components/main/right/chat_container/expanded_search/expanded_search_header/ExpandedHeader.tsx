import {
  CalendarToday,
  CalendarTodayOutlined,
  Close,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import { toggleExpandedPanel } from '../../../../../../redux/slices/CurrentChatNavigationSlice'
import { useAppDispatch } from '../../../../../../redux_hooks'
import SearchInput from '../../../../left/left_header/search_input/SearchInput'

type Props = {}

const ExpandedHeader = (props: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className='w-full px-1 py-1 flex-initial flex flex-row justify-between items-center'>
      <Button
        onClick={() => {
          dispatch(toggleExpandedPanel())
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
      <SearchInput />
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
