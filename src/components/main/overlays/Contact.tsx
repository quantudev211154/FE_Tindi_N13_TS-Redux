import { Search } from '@mui/icons-material'
import { Button, InputAdornment, TextField } from '@mui/material'
import { useEffect } from 'react'
import { AVATAR_SMALL } from '../../../constants/UserAvatarConstant'
import { authState } from '../../../redux/slices/AuthSlice'
import ContactSlice, {
  contactActions,
  contactState,
} from '../../../redux/slices/ContactSlice'
import { controlOverlaysActions } from '../../../redux/slices/ControlOverlaysSlice'
import { loadContacts } from '../../../redux/thunks/ContactThunk'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import UserAvatar from '../../core/UserAvatar'

const Contact = () => {
  const { currentUser } = useAppSelector(authState)
  const { contacts } = useAppSelector(contactState)
  const { toggleContactOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadContacts(currentUser?.id as number))
  }, [currentUser?.id])

  return (
    <div className='w-full min-h-[90vh] rounded-md bg-gray-100 flex flex-col'>
      <div className='w-full px-5 pt-5 pb-2 flex-initial'>
        <p className='text-xl font-medium'>Danh bạ</p>
        <div className='searchbar py-2'>
          <TextField
            fullWidth
            type='text'
            name='contactSearch'
            variant='standard'
            placeholder='Tìm kiếm liên hệ...'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className='flex-1 px-5 overflow-y-scroll flex flex-col'>
        {contacts?.length === 0 ? (
          <span className='mt-8 text-lg text-slate-800'>
            Không tìm thấy liên hệ nào
          </span>
        ) : (
          <></>
        )}
        {contacts?.map((contact) => (
          <Button
            key={contact.id}
            variant='contained'
            disableElevation
            fullWidth
            sx={{
              textAlign: 'none',
              textTransform: 'none',
              justifyContent: 'flex-start',
              alignItems: 'center',
              bgcolor: 'transparent',
              color: 'black',
              py: 1,
              '&:hover': {
                bgcolor: '#bcd1e3',
              },
            }}
          >
            <UserAvatar
              name={contact.fullName}
              avatar={contact.avatar as string}
              size={AVATAR_SMALL}
            />
            <span className='ml-2'>{contact.fullName}</span>
          </Button>
        ))}
      </div>
      <div className='flex-initial px-5 py-3 flex justify-between items-center'>
        <Button
          disableElevation
          onClick={() => {
            dispatch(toggleContactOverlay())
          }}
          variant='contained'
          sx={{
            textTransform: 'none',
            bgcolor: 'transparent',
            color: '#185a94',
            '&:hover': { bgcolor: '#1472c4', color: 'white' },
          }}
        >
          Thêm liên hệ
        </Button>
        <Button
          disableElevation
          onClick={() => {
            dispatch(toggleContactOverlay())
          }}
          variant='contained'
          sx={{
            textTransform: 'none',
            bgcolor: 'transparent',
            color: '#185a94',
            '&:hover': { bgcolor: '#cc2f54', color: 'white' },
          }}
        >
          Đóng
        </Button>
      </div>
    </div>
  )
}

export default Contact
