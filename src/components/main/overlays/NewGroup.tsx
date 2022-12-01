import { Button, TextField } from '@mui/material'
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
      avatar: createRandomHEXColor(),
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
                <div className='flex-1'>
                  <TextField
                    error={errors.groupName ? true : false}
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
