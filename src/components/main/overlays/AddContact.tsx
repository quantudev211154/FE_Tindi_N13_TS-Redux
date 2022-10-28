import { LocalPhoneOutlined, PersonAddAlt1Outlined } from '@mui/icons-material'
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material'
import axios from 'axios'
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
import { addNewContact } from '../../../redux/thunks/ContactThunk'
import {
  AddNewContactPayloadType,
  ContactType,
} from '../../../redux/types/ContactTypes'
import { UserType } from '../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
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
  const onSubmit = async (values: INewContactType) => {}
  const { currentUser } = useAppSelector(authState)
  const { contacts } = useAppSelector(contactState)
  const dispatch = useAppDispatch()
  const { addNewContactInLocal } = contactActions
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
        const response = await axios.get(API_GET_USER_BY_PHONE + tmpPhone)

        const data = response.data as UserType

        setResult(data)

        setIsExistingContact(checkExistingContact(data.phone))
      } catch (error) {
        setResult(null)
      }
    } else {
      setResult(null)
    }
  }

  return (
    <div ref={addContactRef} className='add-contact hidden p-5'>
      <div className='w-full flex flex-col'>
        <div className='flex-initial mb-5'>
          <p className='text-lg font-semibold'>Thêm liên hệ mới</p>
        </div>
        <div className='flex-auto overflow-y-scroll'>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={yup.object({
              phone: yup
                .string()
                .required(
                  'Hãy điền số điện thoại của người mà bạn muốn thêm liên hệ'
                )
                .max(10, 'Số điện thoại này hơi dài so với tiêu chuẩn rồi')
                .matches(
                  /^(0[3|5|7|8|9])+([0-9]{8})$/,
                  'Số điện thoại phải dài đủ 10 kí tự và bắt đầu bằng các đầu số của Việt Nam (03|05|07|08|09)'
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
                    label='Nhập số điện thoại của liên hệ mới'
                    placeholder='Số điện thoại người dùng mà bạn muốn thêm liên hệ'
                    autoFocus
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
                  <div className='flex justify-start items-center rounded-xl p-3 bg-gray-300'>
                    <div className='flex justify-start items-center flex-auto'>
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
                          Đã thiết lập liên hệ
                        </span>
                      ) : (
                        <Tooltip title='Thêm liên hệ mới'>
                          <Button
                            disableElevation
                            onClick={() => {
                              dispatch(addNewContactInLocal(result))

                              const payload: AddNewContactPayloadType = {
                                fullName: result.fullName,
                                isBlocked: false,
                                phone: result.phone,
                                createdAt: new Date().toISOString(),
                                user: currentUser as UserType,
                              }
                              dispatch(addNewContact(payload))

                              setResult(null)
                              values.phone = ''
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
                    Quay lại
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
