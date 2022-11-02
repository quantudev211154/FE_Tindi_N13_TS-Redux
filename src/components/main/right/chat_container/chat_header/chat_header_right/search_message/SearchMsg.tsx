import { Search } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import {
  currentChatNavigationState,
  toggleExpandedPanel,
} from '../../../../../../../redux/slices/CurrentChatNavigationSlice'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'

const SearchMsg = () => {
  const { openExpandedPanel } = useAppSelector(currentChatNavigationState)
  const dispatch = useAppDispatch()

  const onOpenExpandedPanel = () => {
    dispatch(toggleExpandedPanel(openExpandedPanel ? false : true))
  }

  return (
    <Tooltip title='Tìm kiếm tin nhắn' sx={{ mr: 2 }}>
      <Button
        onClick={onOpenExpandedPanel}
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
        <Search sx={{ fill: 'gray', width: 26, height: 26 }} />
      </Button>
    </Tooltip>
  )
}

export default SearchMsg
