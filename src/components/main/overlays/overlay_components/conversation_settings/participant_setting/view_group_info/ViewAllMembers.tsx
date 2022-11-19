import { ArrowBack, ClearOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AVATAR_BASE } from '../../../../../../../constants/UserAvatarConstant'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../../../../../redux/slices/ControlOverlaysSlice'
import {
  ParticipantRoleEnum,
  ParticipantType,
} from '../../../../../../../redux/types/ParticipantTypes'
import { UserType } from '../../../../../../../redux/types/UserTypes'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'
import { sortParticipantsByRole } from '../../../../../../../utilities/conversation/ConversationUtils'
import UserAvatar from '../../../../../../core/UserAvatar'
import { conversationsControlState } from './../../../../../../../redux/slices/ConversationsControlSlice'
import ViewParticipantInfo from './ViewParticipantInfo'

type Props = {
  setShowViewAllMember: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewAllMembers = ({ setShowViewAllMember }: Props) => {
  const { currentChat } = useAppSelector(conversationsControlState)
  const { currentUser } = useAppSelector(authState)
  const dispatch = useAppDispatch()
  const { toggleViewGroupInfoOverlay } = controlOverlaysActions
  const [selectedParticipant, setSelectedParticipant] = useState<
    ParticipantType | undefined
  >(undefined)
  const [chatParticipants, setChatParticipants] = useState<ParticipantType[]>(
    []
  )

  useEffect(() => {
    if (currentChat) {
      setChatParticipants(sortParticipantsByRole(currentChat))
    }
  }, [currentChat])

  return (
    <div className='w-full rounded-2xl bg-white'>
      <div
        style={{
          display: selectedParticipant !== undefined ? 'none' : 'block',
        }}
        className='w-full'
      >
        <div className='flex justify-between items-center px-5 py-3'>
          <div>
            <Button
              onClick={() => {
                setShowViewAllMember(false)
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
            <span className='font-medium text-lg ml-3 text-slate-800'>
              Danh sách thành viên nhóm
            </span>
          </div>
          <Button
            onClick={() => {
              setShowViewAllMember(false)
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
        <div className='px-5 py-2'>
          {currentChat &&
            chatParticipants.map((participant) => {
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
                        {currentUser?.id === currentChat.creator.id
                          ? phone
                          : ''}
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
      <div style={{ display: selectedParticipant ? 'block' : 'none' }}>
        <ViewParticipantInfo
          setShowViewAllMember={setShowViewAllMember}
          participant={selectedParticipant}
          setSelectedParticipant={setSelectedParticipant}
        />
      </div>
    </div>
  )
}

export default ViewAllMembers
