import {
  ArrowBack,
  BlockOutlined,
  ClearOutlined,
  DeleteOutline,
  InfoOutlined,
  PanToolOutlined,
  PersonOffOutlined,
  ShareLocationOutlined,
} from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  AVATAR_BASE,
  AVATAR_LARGE,
} from '../../../../../../../constants/UserAvatarConstant'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../../../../../redux/slices/ControlOverlaysSlice'
import { conversationsControlState } from '../../../../../../../redux/slices/ConversationsControlSlice'
import { messageContextmenuActions } from '../../../../../../../redux/slices/MessageContextmenuSlice'
import {
  grantPermission,
  removeParticipant,
} from '../../../../../../../redux/thunks/ConversationThunks'
import {
  ConversationType,
  ConversationTypeEnum,
  GranPermissionPayloadType,
  RemoveMemberPayload,
} from '../../../../../../../redux/types/ConversationTypes'
import {
  ParticipantRoleEnum,
  ParticipantType,
} from '../../../../../../../redux/types/ParticipantTypes'
import { UserType } from '../../../../../../../redux/types/UserTypes'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'
import { getRoleOfCurrentUserInConversation } from '../../../../../../../utilities/conversation/ConversationUtils'
import { showMessageHandlerResultToSnackbar } from '../../../../../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import UserAvatar from '../../../../../../core/UserAvatar'
import ConfirmDangerAction from '../../../../ConfirmDangerAction'

enum GrantOrRevokeEnum {
  GRANT,
  REVOKE,
}

type Props = {
  participant: ParticipantType | undefined
  setSelectedParticipant: React.Dispatch<
    React.SetStateAction<ParticipantType | undefined>
  >
  setShowViewAllMember: React.Dispatch<React.SetStateAction<boolean>>
}

const ViewParticipantInfo = ({
  setSelectedParticipant,
  participant,
}: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { toggleViewGroupInfoOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()
  const [roleOfCurrentUser, setRoleOfCurrentUser] = useState<
    ParticipantRoleEnum | undefined
  >(undefined)
  const [openConfirmRemoveOverlay, setOpenConfirmRemoveOverlay] =
    useState(false)
  const [selectedRemoveMember, setSelectedRemoveMember] = useState<
    ParticipantType | undefined
  >(undefined)
  const { setHandlerResult } = messageContextmenuActions

  useEffect(() => {
    setRoleOfCurrentUser(
      getRoleOfCurrentUserInConversation(
        currentUser as UserType,
        currentChat as ConversationType
      )
    )
  }, [currentUser])

  const removeParti = () => {
    if (currentUser && selectedRemoveMember !== undefined) {
      const participantOfCurrentUser = currentChat?.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (participantOfCurrentUser !== undefined) {
        const payload: RemoveMemberPayload = {
          adminId: participantOfCurrentUser.id,
          participantId: selectedRemoveMember.id,
        }

        setSelectedParticipant(undefined)
        dispatch(removeParticipant(payload))

        showMessageHandlerResultToSnackbar(
          true,
          'Đã xoá thành viên ' +
            selectedRemoveMember.user.fullName +
            ' khỏi nhóm',
          dispatch,
          setHandlerResult
        )
      }
    }
  }

  const confirmRemoveParticipant = () => {
    setOpenConfirmRemoveOverlay(true)
  }

  const grantOrRevokePermissionForMember = (selection: GrantOrRevokeEnum) => {
    if (currentUser && participant) {
      const participantOfCurrentUser = currentChat?.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (participantOfCurrentUser !== undefined) {
        const grantPayloadType: GranPermissionPayloadType = {
          adminId: participantOfCurrentUser.id,
          participantId: participant.id,
          role:
            selection === GrantOrRevokeEnum.GRANT
              ? ParticipantRoleEnum.MOD
              : ParticipantRoleEnum.MEM,
        }

        setSelectedParticipant(undefined)

        dispatch(grantPermission(grantPayloadType))

        showMessageHandlerResultToSnackbar(
          true,
          `Đã ${
            selection === GrantOrRevokeEnum.GRANT
              ? ' gán quyền điều hành cho thành viên '
              : ' thu hồi quyền điều hành của thành viên '
          }` + participant.user.fullName,
          dispatch,
          setHandlerResult
        )
      }
    }
  }

  return (
    <div className='w-full'>
      <Stack direction={'column'} spacing={1} sx={{ width: '100%' }}>
        <div className='flex justify-between items-center px-5 py-5 bg-white'>
          <div className='flex justify-start items-center'>
            <Button
              onClick={() => {
                setSelectedParticipant(undefined)
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
              Thông tin thành viên
            </span>
          </div>
          <div>
            <Button
              onClick={() => {
                setSelectedParticipant(undefined)
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
        </div>
        <div className='w-full px-5 py-3 bg-white flex justify-start items-center'>
          <UserAvatar
            name={participant?.user.fullName as string}
            avatar={participant?.user.avatar as string}
            size={AVATAR_LARGE}
          />
          <span className='ml-5 text-lg font-medium'>
            {participant?.user.fullName}
          </span>
        </div>
        <div className='px-5 py-3 bg-white flex justify-start items-center'>
          <InfoOutlined sx={{ fill: 'gray', width: 26, height: 26 }} />
          <span className='ml-5'>{participant?.user.phone}</span>
        </div>
        {currentChat?.type === ConversationTypeEnum.GROUP ? (
          <div className='py-1 bg-white'>
            {participant?.role === ParticipantRoleEnum.MEM ? (
              <div
                className='px-5 py-3 cursor-pointer hover:bg-gray-200'
                onClick={() => {
                  grantOrRevokePermissionForMember(GrantOrRevokeEnum.GRANT)
                }}
              >
                <ShareLocationOutlined
                  sx={{ color: '#1d4ed8', width: 26, height: 26 }}
                />
                <span className='ml-5 text-[#1d4ed8]'>
                  Trao quyền điều hành nhóm
                </span>
              </div>
            ) : (
              <></>
            )}
            {roleOfCurrentUser === ParticipantRoleEnum.ADMIN &&
            participant?.role === ParticipantRoleEnum.MOD ? (
              <div
                className='px-5 py-3 cursor-pointer hover:bg-gray-200'
                onClick={() => {
                  grantOrRevokePermissionForMember(GrantOrRevokeEnum.REVOKE)
                }}
              >
                <PanToolOutlined
                  sx={{ color: '#cf0632', width: 26, height: 26 }}
                />
                <span className='ml-5 text-[#cf0632]'>
                  Gỡ quyền điều hành nhóm
                </span>
              </div>
            ) : (
              <></>
            )}
            {roleOfCurrentUser === ParticipantRoleEnum.ADMIN ||
            roleOfCurrentUser === ParticipantRoleEnum.MOD ? (
              <div>
                {participant !== undefined &&
                participant.role === ParticipantRoleEnum.ADMIN ? (
                  <></>
                ) : (
                  <div className='px-5 py-3 cursor-pointer hover:bg-gray-200'>
                    <BlockOutlined
                      sx={{ color: '#cf0632', width: 26, height: 26 }}
                    />
                    <span className='ml-5 text-[#cf0632]'>
                      Chặn gửi tin nhắn
                    </span>
                  </div>
                )}
                {participant !== undefined &&
                (participant.role === ParticipantRoleEnum.MOD ||
                  participant.role === ParticipantRoleEnum.ADMIN) ? (
                  <></>
                ) : (
                  <div
                    className='px-5 py-3 cursor-pointer hover:bg-gray-200'
                    onClick={() => {
                      setSelectedRemoveMember(participant)
                      confirmRemoveParticipant()
                    }}
                  >
                    <PersonOffOutlined
                      sx={{ color: '#cf0632', width: 26, height: 26 }}
                    />
                    <span className='ml-5 text-[#cf0632]'>Xoá khỏi nhóm</span>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </Stack>
      <div className='confirmOverlay'>
        <ConfirmDangerAction
          open={openConfirmRemoveOverlay}
          title={'Bạn chắc chắn muốn xoá thành viên này chứ?'}
          message={'Hãy quyết định kĩ vì thao tác này không thể thu hồi!'}
          reject={() => {
            setSelectedRemoveMember(undefined)
            setOpenConfirmRemoveOverlay(false)
          }}
          resolve={removeParti}
          resolveBtnLabel={'Xoá thành viên này'}
        />
      </div>
    </div>
  )
}

export default ViewParticipantInfo