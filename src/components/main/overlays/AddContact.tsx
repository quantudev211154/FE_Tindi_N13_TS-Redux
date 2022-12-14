import { LocalPhoneOutlined, PersonAddAlt1Outlined } from '@mui/icons-material'
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material'
import { Formik } from 'formik'
import { Ref, useState } from 'react'
import * as yup from 'yup'
import { API_GET_USER_BY_PHONE } from '../../../constants/APIConstant'
import { AVATAR_SMALL } from '../../../constants/UserAvatarConstant'
import { authState } from '../../../redux/slices/AuthSlice'
import {
  contactActions,
  contactState,
} from '../../../redux/slices/ContactSlice'
import { controlOverlaysActions } from '../../../redux/slices/ControlOverlaysSlice'
import {
  conversationActions,
  conversationsControlState,
} from '../../../redux/slices/ConversationsControlSlice'
import { ContactType } from '../../../redux/types/ContactTypes'
import { UserType } from '../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import { createNewContact } from '../../../utilities/contacts/ContactUtils'
import { createNewSingleConversation } from '../../../utilities/conversation/ConversationUtils'
import http from '../../../utilities/http/Http'
import FormErrorDisplay from '../../core/FormErrorDisplay'
import UserAvatar from '../../core/UserAvatar'

type Props = {
  addContactRef: Ref<HTMLDivElement>
  hideAddContactModal: Function
}

interface INewContactType {
  phone: string
}

const initialValues: INewContactType = {
  phone: '',
}

const AddContact = ({ addContactRef, hideAddContactModal }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { contacts } = useAppSelector(contactState)
  const { conversationList } = useAppSelector(conversationsControlState)
  const dispatch = useAppDispatch()
  const { toggleContactOverlay } = controlOverlaysActions
  const { addNewContactInLocal } = contactActions
  const { changeCurrentChat } = conversationActions
  const [result, setResult] = useState<UserType | null>(null)
  const [isExistingContact, setIsExistingContact] = useState(false)

  const checkExistingContact = (phone: string): boolean => {
    for (const iterator of contacts as ContactType[]) {
      if (iterator.phone === phone) return true
    }
    return false
  }

  const onPhoneFieldChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let tmpPhone = event.target.value

    if (tmpPhone.length === 10) {
      try {
        const response = await http.get(API_GET_USER_BY_PHONE + tmpPhone)

        const data = response.data as UserType

        if (data.phone === currentUser?.phone) {
          setResult(null)
        } else {
          setResult(data)
        }

        setIsExistingContact(checkExistingContact(data.phone))
      } catch (error) {
        setResult(null)
      }
    } else {
      setResult(null)
    }
  }

  const onAddNewContact = (values: INewContactType) => {
    createNewContact(
      currentUser as UserType,
      result as UserType,
      addNewContactInLocal,
      dispatch
    )

    setResult(null)
    values.phone = ''
  }

  return (
    <div ref={addContactRef} className='add-contact hidden p-5'>
      <div className='w-full flex flex-col'>
        <div className='flex-initial mb-5'>
          <p className='text-lg font-semibold'>Th??m li??n h??? m???i</p>
        </div>
        <div className='flex-1 overflow-y-scroll'>
          <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
            validationSchema={yup.object({
              phone: yup
                .string()
                .required(
                  'H??y ??i???n s??? ??i???n tho???i c???a ng?????i m?? b???n mu???n th??m li??n h???'
                )
                .max(10, 'S??? ??i???n tho???i n??y h??i d??i so v???i ti??u chu???n r???i')
                .matches(
                  /^(0[3|5|7|8|9])+([0-9]{8})$/,
                  'S??? ??i???n tho???i ph???i d??i ????? 10 k?? t??? v?? b???t ?????u b???ng c??c ?????u s??? c???a Vi???t Nam (03|05|07|08|09)'
                ),
            })}
          >
            {({ handleSubmit, values, handleChange, errors }) => (
              <form onSubmit={handleSubmit}>
                <Stack direction='column' sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <LocalPhoneOutlined />
                        </InputAdornment>
                      ),
                    }}
                    variant='standard'
                    name='phone'
                    type='text'
                    autoComplete='off'
                    label='Nh???p s??? ??i???n tho???i c???a li??n h??? m???i'
                    placeholder='S??? ??i???n tho???i ng?????i d??ng m?? b???n mu???n th??m li??n h???'
                    onChange={(e) => {
                      handleChange(e)
                      onPhoneFieldChange(e)
                    }}
                    value={values.phone}
                    sx={{ mb: 1 }}
                  />
                  <FormErrorDisplay msg={errors.phone} />
                </Stack>
                {result ? (
                  <div
                    className='cursor-pointer flex justify-start items-center rounded-xl p-3 bg-gray-300'
                    onClick={() => {
                      createNewSingleConversation(
                        currentUser as UserType,
                        result as ContactType,
                        conversationList,
                        dispatch,
                        changeCurrentChat,
                        toggleContactOverlay
                      )
                    }}
                  >
                    <div className='flex justify-start items-center flex-1'>
                      <UserAvatar
                        avatar={result.avatar}
                        name={result.fullName}
                        size={AVATAR_SMALL}
                      />
                      <span className='ml-2 font-medium'>
                        {result.fullName}
                      </span>
                    </div>
                    <div className='flex-initial'>
                      {isExistingContact ? (
                        <span className='text-sm font-semibold text-[#185a94]'>
                          ???? thi???t l???p li??n h???
                        </span>
                      ) : (
                        <Tooltip title='Th??m li??n h??? m???i'>
                          <Button
                            disableElevation
                            onClick={() => {
                              onAddNewContact(values)
                            }}
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
                              color: '#185a94',
                              fontSize: '0.875rem',
                              '&:hover': {
                                bgcolor: '#1f75ad',
                                color: 'white',
                              },
                            }}
                          >
                            <PersonAddAlt1Outlined />
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className='flex justify-end items-center mt-5'>
                  <Button
                    disableElevation
                    onClick={() => {
                      hideAddContactModal()
                    }}
                    variant='contained'
                    sx={{
                      textTransform: 'none',
                      bgcolor: 'transparent',
                      mr: 2,
                      color: '#185a94',
                      '&:hover': { bgcolor: '#cc2f54', color: 'white' },
                    }}
                  >
                    Quay l???i
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddContact
