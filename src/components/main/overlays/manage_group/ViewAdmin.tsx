import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'
import { AVATAR_BASE } from '../../../../constants/UserAvatarConstant'
import { authState } from '../../../../redux/slices/AuthSlice'
import { ParticipantType } from '../../../../redux/types/ParticipantTypes'
import { useAppSelector } from '../../../../redux_hooks'
import UserAvatar from '../../../core/UserAvatar'

type Props = {
  admin: ParticipantType
  setCloseViewAdmin: Function
}

const ViewAdmin = ({ admin, setCloseViewAdmin }: Props) => {
  const { currentUser } = useAppSelector(authState)

  return (
    <div className='w-full flex flex-col bg-white'>
      <div className='px-5 py-3 w-full flex justify-start items-center'>
        <Button
          onClick={() => {
            setCloseViewAdmin()
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
        <span className='font-medium text-lg'>Quản trị viên của nhóm</span>
      </div>
      <div className='px-5 flex flex-col py-2'>
        {currentUser ? (
          <div
            key={admin.id}
            className='flex px-5 py-2 justify-start items-center rounded-lg hover:bg-gray-200'
          >
            <UserAvatar
              name={admin.user.fullName}
              avatar={admin.user.avatar}
              size={AVATAR_BASE}
            />
            <div className='ml-3 flex flex-col justify-start'>
              <span className='font-medium text-lg'>
                {admin.user.id === currentUser.id ? 'Bạn' : admin.user.fullName}
              </span>
              <span className='text-sm text-slate-600'>{admin.user.phone}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default ViewAdmin
