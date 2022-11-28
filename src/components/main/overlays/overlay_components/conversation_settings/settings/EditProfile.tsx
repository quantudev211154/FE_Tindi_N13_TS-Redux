import { ArrowBack, ImageOutlined } from '@mui/icons-material'
import { Button, Stack, TextField, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { AVATAR_HUGE } from '../../../../../../constants/UserAvatarConstant'
import { authState } from '../../../../../../redux/slices/AuthSlice'
import { updateUserProfile } from '../../../../../../redux/thunks/UserThunks'
import { useAppDispatch, useAppSelector } from '../../../../../../redux_hooks'
import { getExactTypeOfObject } from '../../../../../../utilities/getExactTypeOfObject/GetExactTypeOfObject'
import { acceptImageType } from '../../../../../../utilities/upload_files/UploadFileUtil'
import UserAvatar from '../../../../../core/UserAvatar'

type Props = {
  returnToMainSetting: Function
}

type UserInfoType = {
  fullName: string
  avatar: string | File
}

const EditProfile = ({ returnToMainSetting }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    fullName: '',
    avatar: '',
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser) {
      setUserInfo({
        ...userInfo,
        fullName: currentUser.fullName,
        avatar: currentUser.avatar,
      })
    }
  }, [currentUser])

  const onChangeUserInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name

    if (fieldName === 'avatar') {
      const file = event.target.files

      if (file) {
        setUserInfo({
          ...userInfo,
          avatar: file[0],
        })
      }
    } else {
      setUserInfo({
        ...userInfo,
        fullName: event.target.value,
      })
    }
  }

  const onChangeProfile = () => {
    if (currentUser) {
      dispatch(
        updateUserProfile({
          ...currentUser,
          userId: currentUser.id,
          avatar: userInfo.avatar,
          fullName: userInfo.fullName,
        })
      )

      returnToMainSetting()
    }
  }

  return (
    <div className='bg-white'>
      <div className='px-5 py-3 w-full flex justify-start items-center'>
        <Button
          onClick={() => {
            returnToMainSetting()
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
          <ArrowBack sx={{ fill: 'gray', width: 26, height: 26 }} />
        </Button>
        <span className='font-medium text-lg ml-3'>Chỉnh sửa hồ sơ</span>
      </div>
      <div className='px-8 py-3'>
        <Stack
          direction={'column'}
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {currentUser ? (
            <div className='relative rounded-full'>
              {getExactTypeOfObject(userInfo.avatar) === 'File' ? (
                <img
                  src={URL.createObjectURL(userInfo.avatar as File)}
                  className='w-24 h-24 rounded-full object-cover'
                />
              ) : (
                <UserAvatar
                  name={userInfo.fullName}
                  avatar={userInfo.avatar as string}
                  size={AVATAR_HUGE}
                />
              )}
              <div className='absolute right-0 -bottom-2 z-30'>
                <Tooltip title='Đổi ảnh đại diện' placement='bottom'>
                  <Button
                    component='label'
                    id='showEmojiPicker'
                    variant='contained'
                    sx={{
                      maxWidth: '2rem',
                      maxHeight: '2rem',
                      minWidth: '2rem',
                      minHeight: '2rem',
                      borderRadius: '50%',
                      bgcolor: '#1a77c4',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#1863a1',
                      },
                    }}
                    disableElevation
                  >
                    <ImageOutlined />
                    <input
                      type='file'
                      name='avatar'
                      onChange={onChangeUserInfo}
                      hidden
                      accept={acceptImageType()}
                    />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ) : (
            <></>
          )}
          {currentUser ? (
            <TextField
              autoFocus
              fullWidth
              name='fullName'
              variant='outlined'
              value={userInfo.fullName}
              placeholder='Tên mà bạn muốn hiển thị'
              label='Tên của bạn'
              onChange={onChangeUserInfo}
            />
          ) : (
            <></>
          )}
        </Stack>
      </div>
      <div className='px-5 py-3 flex justify-end items-center'>
        <Button
          disableElevation
          onClick={() => {
            returnToMainSetting()
          }}
          variant='contained'
          sx={{
            textTransform: 'none',
            bgcolor: 'transparent',
            color: '#185a94',
            '&:hover': { bgcolor: '#cc2f54', color: 'white' },
          }}
        >
          Huỷ
        </Button>
        <Button
          disabled={
            (currentUser &&
              userInfo.avatar === currentUser.avatar &&
              userInfo.fullName === currentUser.fullName) ||
            userInfo.fullName === ''
              ? true
              : false
          }
          onClick={onChangeProfile}
          disableElevation
          variant='contained'
          sx={{
            textTransform: 'none',
            bgcolor: 'transparent',
            color: '#185a94',
            '&:hover': { bgcolor: '#1472c4', color: 'white' },
          }}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  )
}

export default EditProfile
