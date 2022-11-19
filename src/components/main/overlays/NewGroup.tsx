import { Button, TextField, Tooltip } from '@mui/material'
import { Formik } from 'formik'
import {
  controlOverlaysActions,
  controlOverlaysState,
} from '../../../redux/slices/ControlOverlaysSlice'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import * as yup from 'yup'
import FormErrorDisplay from '../../core/FormErrorDisplay'
import { useEffect, useRef, useState } from 'react'
import AddMembersToGroup from './overlay_components/new_group/AddMembersToGroup'
import { NewGroupPayloadType } from '../../../redux/types/GroupTypes'
import { loadContacts } from './../../../redux/thunks/ContactThunk'
import { authState } from '../../../redux/slices/AuthSlice'
import { createRandomHEXColor } from '../../../utilities/random_color_creator/CreateRandomHEXColor'

interface INewGroup {
  groupName: string
}

const initialValue: INewGroup = {
  groupName: '',
}

const NewGroup = () => {
  const { currentUser } = useAppSelector(authState)
  const { openNewGroupOverlay } = useAppSelector(controlOverlaysState)
  const controlOverlayActions = controlOverlaysActions
  const dispatch = useAppDispatch()
  const [isOpenAddMemberOverlay, setIsOpenAddMembersOverlay] = useState(false)
  const [groupAvatar, setGroupAvatar] = useState<File | undefined>(undefined)
  const [newGroupInfo, setNewGroupInfo] = useState<
    NewGroupPayloadType | undefined
  >(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    dispatch(loadContacts(currentUser?.id as number))
  }, [])

  useEffect(() => {
    if (openNewGroupOverlay) inputRef.current && inputRef.current.focus()
  }, [openNewGroupOverlay])

  const backToNewGroupOverlay = () => {
    setIsOpenAddMembersOverlay(false)
  }

  const onFormSubmit = (values: INewGroup) => {
    setIsOpenAddMembersOverlay(true)

    setNewGroupInfo({
      ...newGroupInfo,
      avatar: groupAvatar !== undefined ? groupAvatar : createRandomHEXColor(),
      title: values.groupName,
    })
  }

  return (
    <div className='w-full rounded-md bg-gray-100 p-5 flex flex-col'>
      <div
        style={{ display: isOpenAddMemberOverlay ? 'none' : 'block' }}
        className='w-full'
      >
        <Formik
          initialValues={initialValue}
          onSubmit={onFormSubmit}
          validationSchema={yup.object({
            groupName: yup.string().required('Đừng để trống tên nhóm!'),
          })}
        >
          {({ handleSubmit, handleChange, errors, values }) => (
            <form onSubmit={handleSubmit}>
              <div className='w-full text-center'>
                <p className='text-2xl font-semibold uppercase mb-5'>
                  Tạo nhóm mới
                </p>
              </div>
              <div className='w-full flex justify-between items-center'>
                {/* <div className='flex-initial h-full'>
                  <Tooltip title='Thêm ảnh đại diện cho nhóm'>
                    <Button
                      component='label'
                      disableElevation
                      onClick={() => {
                        console.log(123)
                      }}
                      variant='contained'
                      sx={{
                        position: 'relative',
                        maxWidth: '5rem',
                        maxHeight: '5rem',
                        minWidth: '5rem',
                        minHeight: '5rem',
                        borderRadius: '50%',
                        width: '5rem',
                        height: '5rem',
                        textTransform: 'none',
                        bgcolor: '#3181f7',
                        mr: 2,
                        color: 'white',
                        fontSize: '0.875rem',
                        padding: groupAvatar !== undefined ? 0 : 'auto',
                        transition: '.2s ease',
                        '&:hover': { bgcolor: '#246fe0', color: 'white' },
                      }}
                    >
                      {groupAvatar !== undefined ? (
                        <>
                          <img
                            src={URL.createObjectURL(groupAvatar)}
                            className='w-full h-full object-cover rounded-full z-20'
                          />
                          <div
                            style={{
                              backgroundColor: 'rgba(94, 88, 91, 0.1)',
                            }}
                            className='absolute w-full h-full z-30 rounded-full'
                          >
                            <AddPhotoAlternateOutlined
                              sx={{
                                width: '2rem',
                                height: '2rem',
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                color: 'gray',
                                zIndex: '30',
                                transform: 'translate(-50%, -50%)',
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <AddPhotoAlternateOutlined
                          sx={{ width: '2rem', height: '2rem' }}
                        />
                      )}
                      <input
                        type='file'
                        hidden
                        accept={acceptImageType()}
                        onChange={(event) => {
                          const files = event.target.files

                          if (files) {
                            setGroupAvatar(files[0])
                          }
                        }}
                      />
                    </Button>
                  </Tooltip>
                </div> */}
                <div className='flex-1'>
                  <TextField
                    inputRef={inputRef}
                    fullWidth
                    name='groupName'
                    label='Tên nhóm'
                    placeholder='Tên hiển thị của nhóm'
                    onChange={handleChange}
                    value={values.groupName}
                  />
                  <FormErrorDisplay
                    msg={errors.groupName}
                    sx={{ marginBottom: 0 }}
                  />
                </div>
              </div>
              <div className='w-full flex justify-end items-center mt-5'>
                <Button
                  disableElevation
                  onClick={() => {
                    dispatch(controlOverlayActions.toggleNewGroupOverlay())
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
                <Button
                  type='submit'
                  disableElevation
                  variant='contained'
                  sx={{
                    textTransform: 'none',
                    bgcolor: 'transparent',
                    color: '#185a94',
                    '&:hover': { bgcolor: '#1472c4', color: 'white' },
                  }}
                >
                  Tiếp tục
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div
        style={{ display: isOpenAddMemberOverlay ? 'block' : 'none' }}
        className='w-full'
      >
        <AddMembersToGroup
          groupName={newGroupInfo?.title as string}
          backToNewGroupOverlay={backToNewGroupOverlay}
        />
      </div>
    </div>
  )
}

export default NewGroup
