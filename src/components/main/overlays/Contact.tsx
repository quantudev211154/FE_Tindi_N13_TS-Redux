import {
  PersonRemoveAlt1Outlined,
  Search,
  SettingsOutlined,
} from '@mui/icons-material'
import {
  Backdrop,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material'
import { useEffect, useRef } from 'react'
import { authState } from '../../../redux/slices/AuthSlice'
import { contactState } from '../../../redux/slices/ContactSlice'
import { controlOverlaysActions } from '../../../redux/slices/ControlOverlaysSlice'
import { loadContacts } from '../../../redux/thunks/ContactThunk'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import AddContact from './AddContact'
import ContactMain from './overlay_components/contacts/ContactMain'

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null)
  const addContactRef = useRef<HTMLDivElement>(null)
  const { currentUser } = useAppSelector(authState)
  const { contacts, isLoadingContacts } = useAppSelector(contactState)
  const { toggleContactOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadContacts(currentUser?.id as number))
  }, [currentUser])

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
          {isLoadingContacts ? (
            <Backdrop
              open={true}
              sx={{
                bgcolor: 'transparent',
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                margin: 'auto',
                textAlign: 'center',
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <CircularProgress color='info' />
              <span className='font-medium text-slate-600 mt-5'>
                Đợi Tindi xíu. <br /> Đang tải danh sách liên hệ...
              </span>
            </Backdrop>
          ) : (
            <></>
          )}
          {!isLoadingContacts && contacts?.length === 0 ? (
            <span className='mt-8 text-lg text-slate-800 font-medium text-center'>
              Bạn chưa có liên hệ nào.
              <br />
              Thêm một vài liên hệ mới thôi nào!
            </span>
          ) : (
            <></>
          )}
          {!isLoadingContacts &&
            contacts?.map((contact) => (
              <ContactMain key={contact.id} contact={contact} />
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