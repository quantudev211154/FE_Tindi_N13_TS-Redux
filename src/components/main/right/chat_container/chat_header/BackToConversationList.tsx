import { ArrowBackOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import { responsiveActions } from '../../../../../redux/slices/Responsive'
import { useAppDispatch } from '../../../../../redux_hooks'

const BackToConversationList = () => {
  const { openMessageList } = responsiveActions
  const dispatch = useAppDispatch()

  return (
    <div className='block md:hidden'>
      <Button
        onClick={() => {
          dispatch(openMessageList(false))
        }}
        variant='contained'
        sx={{
          maxWidth: '2.5rem',
          maxHeight: '2.5rem',
          minWidth: '2.5rem',
          minHeight: '2.5rem',
          borderRadius: '50%',
          mr: 2,
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: '#eeeee4',
          },
        }}
        disableElevation
      >
        <ArrowBackOutlined sx={{ fill: 'gray', width: 26, height: 26 }} />
      </Button>
    </div>
  )
}

export default BackToConversationList
