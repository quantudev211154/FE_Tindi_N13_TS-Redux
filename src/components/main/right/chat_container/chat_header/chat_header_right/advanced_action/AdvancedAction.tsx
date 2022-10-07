import { MoreVert } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'

type Props = {}

const AdvancedAction = (props: Props) => {
  return (
    <div className='relative'>
      <Tooltip title='Xem thêm các tuỳ chọn khác'>
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
          <MoreVert sx={{ fill: 'gray', width: 26, height: 26 }} />
        </Button>
      </Tooltip>
    </div>
  )
}

export default AdvancedAction
