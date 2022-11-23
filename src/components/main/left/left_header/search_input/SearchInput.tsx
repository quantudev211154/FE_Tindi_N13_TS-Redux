import { Search } from '@mui/icons-material'
import { InputAdornment, InputBase, Stack } from '@mui/material'
import { conversationActions } from '../../../../../redux/slices/ConversationsControlSlice'
import { useAppDispatch } from '../../../../../redux_hooks'

const SearchInput = () => {
  const { setFindConverKeyword } = conversationActions
  const dispatch = useAppDispatch()

  return (
    <div className='w-full'>
      <Stack maxWidth='100%'>
        <InputBase
          onChange={(e) => {
            dispatch(setFindConverKeyword(e.target.value))
          }}
          type='search'
          startAdornment={
            <InputAdornment position='start'>
              <Search
                sx={{
                  fill: 'gray',
                  pointerEvents: 'none',
                }}
              />
            </InputAdornment>
          }
          sx={{
            border: '2px solid white',
            bgcolor: '#edeff2',
            borderRadius: '2rem',
            padding: '0.3rem 1rem',
            transition: '.2s ease',
            '&.Mui-focused': {
              border: '2px solid #5894f5',
              bgcolor: 'white',
              '& svg': {
                fill: '#5894f5',
              },
            },
          }}
          placeholder='Tìm kiếm...'
        />
      </Stack>
    </div>
  )
}

export default SearchInput
