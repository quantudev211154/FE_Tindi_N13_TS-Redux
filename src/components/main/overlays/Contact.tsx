import { PersonRemoveAlt1Outlined, Search } from '@mui/icons-material'
import { Button, InputAdornment, TextField, Tooltip } from '@mui/material'
import { useEffect, useRef } from 'react'
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
import AddContact from './AddContact'

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null)
  const addContactRef = useRef<HTMLDivElement>(null)
  const { currentUser } = useAppSelector(authState)
  const { contacts } = useAppSelector(contactState)
  const { toggleContactOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadContacts(currentUser?.id as number))
  }, [currentUser?.id])

  const showAddContactModal = () => {
    contactRef.current?.classList.add('hidden')
    addContactRef.current?.classList.remove('hidden')
  }

  const hideAddContactModal = () => {
    contactRef.current?.classList.remove('hidden')
    addContactRef.current?.classList.add('hidden')
  }

  return (
    <div className='w-full rounded-md bg-gray-100'>
      <div
        ref={contactRef}
        className='contact-list w-full min-h-[90vh] flex flex-col'
      >
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
            <span className='mt-8 text-lg text-slate-800 font-medium text-center'>
              Bạn chưa có liên hệ nào.
              <br />
              Thêm một vài liên hệ mới thôi nào!
            </span>
          ) : (
            <></>
          )}
          {contacts?.map((contact) => (
            <div
              key={contact.id}
              className='p-3 flex justify-between items-center rounded-xl transition-all hover:bg-[#bcd1e3]'
            >
              <div className='flex-auto flex justify-start items-center'>
                <UserAvatar
                  name={contact.fullName}
                  avatar={contact.avatar as string}
                  size={AVATAR_SMALL}
                />
                <span className='ml-2 pointer-events-none'>
                  {contact.fullName}
                </span>
              </div>
              <div className='flex-initial'>
                <Tooltip title='Huỷ liên hệ'>
                  <Button
                    disableElevation
                    onClick={() => {}}
                    variant='contained'
                    sx={{
                      maxWidth: '2.5rem',
                      maxHeight: '2.5rem',
                      minWidth: '2.5rem',
                      minHeight: '2.5rem',
                      borderRadius: '50%',
                      textTransform: 'none',
                      bgcolor: 'transparent',
                      mr: 2,
                      color: '#cc2f54',
                      fontSize: '0.875rem',
                      '&:hover': { bgcolor: '#cc2f54', color: 'white' },
                    }}
                  >
                    <PersonRemoveAlt1Outlined />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
        <div className='flex-initial px-5 py-3 flex justify-between items-center'>
          <Button
            disableElevation
            onClick={showAddContactModal}
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
      <AddContact
        addContactRef={addContactRef}
        hideAddContactModal={hideAddContactModal}
      />
    </div>
  )
}

export default Contact
