import {
  AddPhotoAlternateOutlined,
  AdminPanelSettingsOutlined,
  StarOutline,
  VpnKeyOutlined,
} from '@mui/icons-material'
import { Button, Modal, Stack, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { authState } from '../../../redux/slices/AuthSlice'
import {
  controlOverlaysActions,
  controlOverlaysState,
} from '../../../redux/slices/ControlOverlaysSlice'
import { messageContextmenuActions } from '../../../redux/slices/MessageContextmenuSlice'
import { updateConversationAvatarAndTitle } from '../../../redux/thunks/ConversationThunks'
import {
  ConversationTypeEnum,
  UpdateConversationPayloadType,
} from '../../../redux/types/ConversationTypes'
import { ParticipantRoleEnum } from '../../../redux/types/ParticipantTypes'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import {
  getParticipantsByRole,
  getTeammateInSingleConversation,
} from '../../../utilities/conversation/ConversationUtils'
import { showMessageHandlerResultToSnackbar } from '../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import { acceptImageType } from '../../../utilities/upload_files/UploadFileUtil'
import { conversationsControlState } from './../../../redux/slices/ConversationsControlSlice'
import ViewAdmin from './manage_group/ViewAdmin'
import ViewMods from './manage_group/ViewMods'

const ManageGroup = () => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const dispatch = useAppDispatch()
  const { openManageGroupOverlay } = useAppSelector(controlOverlaysState)
  const { toggleManageGroupOverlay } = controlOverlaysActions
  const [groupAvatar, setGroupAvatar] = useState<File | undefined>(undefined)
  const [groupname, setGroupname] = useState('')
  const { setHandlerResult } = messageContextmenuActions
  const [isOpenViewAdmin, setIsOpenViewAdmin] = useState(false)
  const [isOpenViewMods, setIsOpenViewMods] = useState(false)

  useEffect(() => {
    if (currentUser && currentChat) {
      setGroupname(
        currentChat.type === ConversationTypeEnum.GROUP
          ? currentChat.title
          : getTeammateInSingleConversation(currentUser, currentChat).user
              .fullName
      )
    }
  }, [currentChat])

  const onGroupnameTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGroupname(event.target.value)
  }

  const updateAvatarAndGroupname = () => {
    if (currentChat) {
      let formData = new FormData()
      if (groupAvatar !== undefined) {
        formData.append('file', groupAvatar)
      }
      formData.append('name', groupname)

      const payload: UpdateConversationPayloadType = {
        formData,
        conversationId: currentChat.id,
        users: currentChat.participantResponse.map((parti) => parti.user),
      }
      dispatch(updateConversationAvatarAndTitle(payload))

      showMessageHandlerResultToSnackbar(
        true,
        '???? c???p nh???t th??ng tin c???a nh??m',
        dispatch,
        setHandlerResult
      )
    }
  }

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files) {
      setGroupAvatar(files[0])
    }
  }

  const onSaveModifiers = () => {
    dispatch(toggleManageGroupOverlay())
    updateAvatarAndGroupname()
  }

  return (
    <Modal
      open={openManageGroupOverlay}
      onClose={() => {
        dispatch(toggleManageGroupOverlay())
      }}
    >
      <div
        className='w-5/6 max-h-[90vh] overflow-y-auto md:w-1/3 bg-gray-200 rounded-2xl relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden
      '
      >
        {!isOpenViewAdmin && !isOpenViewMods ? (
          <Stack spacing={1} sx={{ width: '100%', borderRadius: '.375rem' }}>
            <div className='bg-white px-5 py-3'>
              <span className='text-xl text-gray-800'>Ch???nh s???a nh??m</span>
            </div>
            <div className='w-full bg-white px-5 py-3'>
              <div className='flex justify-start items-center h-full'>
                <Tooltip title='C???p nh???t ???nh ?????i di???n'>
                  <Button
                    component='label'
                    disableElevation
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
                              color: 'white',
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
                      onChange={onFileInputChange}
                    />
                  </Button>
                </Tooltip>
                <TextField
                  fullWidth
                  label='T??n nh??m'
                  name='groupname'
                  value={groupname}
                  onChange={onGroupnameTextFieldChange}
                />
              </div>
            </div>
            <div className='w-full py-2 bg-white'>
              <div className='w-full px-5 py-3 cursor-pointer hover:bg-slate-200'>
                <span className='text-white p-2 bg-green-600 rounded-xl'>
                  <VpnKeyOutlined />
                </span>
                <span className='ml-5'>Quy???n c???a c??c th??nh vi??n nh??m</span>
              </div>
              <div
                className='w-full px-5 py-3 cursor-pointer hover:bg-slate-200'
                onClick={() => setIsOpenViewAdmin(true)}
              >
                <span className='text-white p-2 bg-pink-600 rounded-xl'>
                  <AdminPanelSettingsOutlined />
                </span>
                <span className='ml-5'>Qu???n tr??? vi??n</span>
              </div>
              <div
                className='w-full px-5 py-3 cursor-pointer hover:bg-slate-200'
                onClick={() => setIsOpenViewMods(true)}
              >
                <span className='text-white p-2 bg-blue-500 rounded-xl'>
                  <StarOutline />
                </span>
                <span className='ml-5'>C??c ??i???u h??nh vi??n</span>
              </div>
            </div>
            <div className='bg-white px-5 py-3 flex justify-end items-center'>
              <Button
                disableElevation
                onClick={() => {
                  dispatch(toggleManageGroupOverlay())
                }}
                variant='contained'
                sx={{
                  textTransform: 'none',
                  bgcolor: 'transparent',
                  color: '#185a94',
                  '&:hover': { bgcolor: '#cc2f54', color: 'white' },
                }}
              >
                ????ng
              </Button>
              <Button
                onClick={onSaveModifiers}
                disableElevation
                variant='contained'
                sx={{
                  textTransform: 'none',
                  bgcolor: 'transparent',
                  color: '#185a94',
                  '&:hover': { bgcolor: '#1472c4', color: 'white' },
                }}
              >
                L??u c??c ch???nh s???a
              </Button>
            </div>
          </Stack>
        ) : (
          <></>
        )}
        {isOpenViewAdmin && currentChat ? (
          <ViewAdmin
            admin={
              getParticipantsByRole(
                ParticipantRoleEnum.ADMIN,
                currentChat.participantResponse
              )[0]
            }
            setCloseViewAdmin={() => {
              setIsOpenViewAdmin(false)
            }}
          />
        ) : (
          <></>
        )}
        {isOpenViewMods && currentChat ? (
          <ViewMods
            mods={getParticipantsByRole(
              ParticipantRoleEnum.MOD,
              currentChat.participantResponse
            )}
            setCloseViewMods={() => {
              setIsOpenViewMods(false)
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </Modal>
  )
}

export default ManageGroup
