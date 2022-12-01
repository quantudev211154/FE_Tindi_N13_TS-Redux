import { ClearOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import { AVATAR_LARGE } from '../../../../../constants/UserAvatarConstant'
import { controlOverlaysActions } from '../../../../../redux/slices/ControlOverlaysSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../../../redux/types/ConversationTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch } from '../../../../../redux_hooks'
import { parseDateByDayMonthYear } from '../../../../../utilities/date_utils/ParseDate'
import GroupAvatar, { GroupAvatarSizeEnum } from '../../../../core/GroupAvatar'
import UserAvatar from '../../../../core/UserAvatar'

type Props = {
  teammateInSingleConversation: UserType | undefined
  currentChat: ConversationType | null
}

const ViewGroupHeader = ({
  teammateInSingleConversation,
  currentChat,
}: Props) => {
  const { toggleViewGroupInfoOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()

  return (
    <div className='w-full rounded-2xl px-5 py-3 bg-white flex flex-col justify-start items-center'>
      <div className='w-full flex justify-between items-center pb-3'>
        <p className='font-medium text-xl'>{`Thông tin ${
          currentChat?.type === ConversationTypeEnum.GROUP
            ? 'nhóm'
            : 'cuộc trò chuyện'
        }`}</p>
        <Button
          onClick={() => {
            dispatch(toggleViewGroupInfoOverlay())
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
      <div className='w-full flex justify-start items-center'>
        <div className='flex flex-col justify-center'>
          {currentChat?.type === ConversationTypeEnum.GROUP ? (
            !currentChat.avatar.startsWith('#') ? (
              <UserAvatar
                avatar={currentChat?.avatar as string}
                name={currentChat?.title as string}
                size={AVATAR_LARGE}
              />
            ) : (
              <GroupAvatar
                groupName={currentChat.title}
                groupAvatar={currentChat.avatar}
                participants={currentChat.participantResponse}
                size={GroupAvatarSizeEnum.LARGE}
              />
            )
          ) : (
            <UserAvatar
              avatar={teammateInSingleConversation?.avatar as string}
              name={teammateInSingleConversation?.fullName as string}
              size={AVATAR_LARGE}
            />
          )}
        </div>
        <div className='flex flex-col ml-10'>
          <p className='text-2xl font-medium'>
            {currentChat && currentChat.type === ConversationTypeEnum.GROUP
              ? currentChat?.title
              : teammateInSingleConversation?.fullName}
          </p>
          <p className='text-slate-700 mt-1'>
            {currentChat && currentChat.type === ConversationTypeEnum.GROUP
              ? currentChat?.participantResponse.length + ' thành viên'
              : ''}
          </p>
          <p className='text-slate-700 text-sm mt-1'>
            {currentChat
              ? `Ngày ${
                  currentChat.type === ConversationTypeEnum.GROUP
                    ? 'tạo'
                    : 'bắt đầu'
                }: ${parseDateByDayMonthYear(currentChat.createdAt)}`
              : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ViewGroupHeader
