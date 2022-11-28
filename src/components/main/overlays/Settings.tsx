import {
  AccountCircle,
  ClearOutlined,
  Password,
  Shield,
} from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'
import { authState } from '../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../redux/slices/ControlOverlaysSlice'
import { UserType } from '../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import UserAvatar from '../../core/UserAvatar'
import { AVATAR_LARGE } from './../../../constants/UserAvatarConstant'
import ChangePwd from './overlay_components/conversation_settings/settings/ChangePwd'
import EditProfile from './overlay_components/conversation_settings/settings/EditProfile'
import Private from './overlay_components/conversation_settings/settings/Private'

export enum SwitchedSettingOverlayType {
  OVERALL,
  EDIT_PROFILE,
  CHANGE_PWD,
  PRIVATE,
}

const Settings = () => {
  const { currentUser } = useAppSelector(authState)
  const { toggleSettingOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()
  const [currentDetailSettingOverlay, setCurrentDetailSettingOverlay] =
    useState<SwitchedSettingOverlayType>(SwitchedSettingOverlayType.OVERALL)

  const returnToMainSetting = () => {
    setCurrentDetailSettingOverlay(SwitchedSettingOverlayType.OVERALL)
  }

  return (
    <div className='w-full bg-gray-100 rounded-lg overflow-hidden'>
      {currentDetailSettingOverlay === SwitchedSettingOverlayType.OVERALL ? (
        <div>
          <div className='px-5 py-3 w-full flex justify-between items-center bg-white'>
            <span className='font-medium text-xl'>Cài đặt</span>
            <Button
              onClick={() => {
                dispatch(toggleSettingOverlay())
              }}
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
              <ClearOutlined sx={{ fill: 'gray', width: 26, height: 26 }} />
            </Button>
          </div>
          <div className='px-5 py-3 bg-white flex justify-start items-center'>
            <div className='relative mr-5'>
              <UserAvatar
                name={(currentUser as UserType).fullName}
                avatar={(currentUser as UserType).avatar}
                size={AVATAR_LARGE}
              />
              <div className='absolute'></div>
            </div>
            <div>
              <p className='text-lg font-medium'>
                {currentUser && currentUser.fullName}
              </p>
              <p className='mt-1 text-sm text-slate-700'>
                {currentUser && currentUser.phone}
              </p>
            </div>
          </div>
          <div className='py-2 bg-white mt-3'>
            <div
              onClick={() => {
                setCurrentDetailSettingOverlay(
                  SwitchedSettingOverlayType.EDIT_PROFILE
                )
              }}
              className='flex justify-start items-center px-5 py-3 cursor-pointer hover:bg-gray-200'
            >
              <label className='p-1 bg-[#f29f33] rounded-md text-white'>
                <AccountCircle sx={{ width: 25, height: 25 }} />
              </label>
              <span className='ml-5'>Chỉnh sửa hồ sơ</span>
            </div>
            <div
              onClick={() => {
                setCurrentDetailSettingOverlay(
                  SwitchedSettingOverlayType.CHANGE_PWD
                )
              }}
              className='flex justify-start items-center px-5 py-3 cursor-pointer hover:bg-gray-200'
            >
              <label className='p-1 bg-[#9333f2] rounded-md text-white'>
                <Password sx={{ width: 25, height: 25 }} />
              </label>
              <span className='ml-5'>Đổi mật khẩu</span>
            </div>
            <div
              onClick={() => {
                setCurrentDetailSettingOverlay(
                  SwitchedSettingOverlayType.PRIVATE
                )
              }}
              className='flex justify-start items-center px-5 py-3 cursor-pointer hover:bg-gray-200'
            >
              <label className='p-1 bg-[#33d48e] rounded-md text-white'>
                <Shield sx={{ width: 25, height: 25 }} />
              </label>
              <span className='ml-5'>Riêng tư</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {currentDetailSettingOverlay ===
      SwitchedSettingOverlayType.EDIT_PROFILE ? (
        <EditProfile returnToMainSetting={returnToMainSetting} />
      ) : (
        <></>
      )}
      {currentDetailSettingOverlay === SwitchedSettingOverlayType.CHANGE_PWD ? (
        <ChangePwd returnToMainSetting={returnToMainSetting} />
      ) : (
        <></>
      )}
      {currentDetailSettingOverlay === SwitchedSettingOverlayType.PRIVATE ? (
        <Private returnToMainSetting={returnToMainSetting} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default Settings
