import { PeopleOutline, PersonAddOutlined } from '@mui/icons-material'
import { Fab, Tooltip } from '@mui/material'
import { authState } from '../../../../../redux/slices/AuthSlice'
import { useAppSelector } from '../../../../../redux_hooks'
import UserAvatar from '../../../../core/UserAvatar'
import { conversationsControlState } from '../../../../../redux/slices/ConversationsControlSlice'
import { AVATAR_BASE } from '../../../../../constants/UserAvatarConstant'
import {
  ParticipantRoleEnum,
  ParticipantType,
} from '../../../../../redux/types/ParticipantTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useState } from 'react'
import { ConversationTypeEnum } from '../../../../../redux/types/ConversationTypes'

type Props = {
  setShowAddMemberToGroup: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedParticipant: React.Dispatch<
    React.SetStateAction<ParticipantType | undefined>
  >
  setShowViewAllMember: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewGroupMembers = ({
  setShowAddMemberToGroup,
  setSelectedParticipant,
  setShowViewAllMember,
}: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)

  return (
    <div className='w-full bg-white rounded-2xl pb-3'>
      <div className='flex justify-between items-center px-5 py-3'>
        <div
          className='flex-1 flex items-center cursor-pointer hover:bg-gray-200 py-3 rounded-lg'
          onClick={() => {
            setShowViewAllMember(true)
          }}
        >
          <PeopleOutline sx={{ width: '2rem', height: '2rem' }} />
          <span className='ml-5 font-medium'>
            {currentChat && currentChat.participantResponse.length} thành viên
          </span>
        </div>
        <div>
          {currentChat && currentChat.type === ConversationTypeEnum.GROUP ? (
            <Tooltip title='Thêm thành viên vào nhóm'>
              <Fab
                color='default'
                sx={{
                  maxWidth: '2.5rem',
                  minWidth: '2.5rem',
                  maxHeight: '2.5rem',
                  minHeight: '2.5rem',
                }}
                onClick={() => {
                  setShowAddMemberToGroup(true)
                }}
              >
                <PersonAddOutlined />
              </Fab>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='w-full flex flex-col max-h-96 overflow-auto'>
        {currentChat &&
          currentChat.participantResponse.map((participant) => {
            const {
              user: { fullName, phone, avatar },
            } = participant

            return (
              <div
                key={participant.id}
                style={{
                  pointerEvents:
                    participant.user.id === (currentUser as UserType).id
                      ? 'none'
                      : 'auto',
                }}
                onClick={() => {
                  setSelectedParticipant(participant)
                }}
                className='w-full px-5 py-2 flex items-center justify-between rounded-xl cursor-pointer hover:bg-slate-300'
              >
                <div className='flex items-center justify-start'>
                  <UserAvatar
                    name={fullName}
                    avatar={avatar}
                    size={AVATAR_BASE}
                  />
                  <div className='ml-5'>
                    <p className='font-medium text-sm'>{fullName}</p>
                    <p className='text-sm'>
                      {currentUser?.id === currentChat.creator.id ? phone : ''}
                    </p>
                  </div>
                </div>
                <div className='text-sm'>
                  {participant.role === ParticipantRoleEnum.ADMIN ? (
                    <span className='text-rose-700 font-semibold'>
                      Quản trị viên
                    </span>
                  ) : participant.role === ParticipantRoleEnum.MOD ? (
                    <span className='text-blue-700 font-semibold'>
                      Điều hành viên
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ViewGroupMembers
