import { Search } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'

type Props = {}

const SearchMsg = (props: Props) => {
  return (
    <Tooltip title='Tìm kiếm tin nhắn' sx={{ mr: 2 }}>
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
        <Search sx={{ fill: 'gray', width: 26, height: 26 }} />
      </Button>
    </Tooltip>
  )
}

export default SearchMsg
