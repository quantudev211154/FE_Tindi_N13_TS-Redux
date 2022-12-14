import {
  ArrowBack,
  BlockOutlined,
  ClearOutlined,
  InfoOutlined,
  PanToolOutlined,
  PersonOffOutlined,
  ShareLocationOutlined,
  ThumbUpAltOutlined,
} from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AVATAR_LARGE } from '../../../../../../../constants/UserAvatarConstant'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../../../../../redux/slices/ControlOverlaysSlice'
import { conversationsControlState } from '../../../../../../../redux/slices/ConversationsControlSlice'
import { messageContextmenuActions } from '../../../../../../../redux/slices/MessageContextmenuSlice'
import {
  grantPermission,
  removeParticipant,
  updateStatusOfParticipant,
} from '../../../../../../../redux/thunks/ConversationThunks'
import {
  ConversationType,
  ConversationTypeEnum,
  GrantPermissionPayloadType,
  RemoveMemberPayload,
} from '../../../../../../../redux/types/ConversationTypes'
import {
  ParticipantRoleEnum,
  ParticipantStatusEnum,
  ParticipantType,
} from '../../../../../../../redux/types/ParticipantTypes'
import { UserType } from '../../../../../../../redux/types/UserTypes'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'
import { MySocket } from '../../../../../../../services/TindiSocket'
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
    if (currentUser && selectedRemoveMember !== undefined && currentChat) {
      const participantOfCurrentUser = currentChat.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (participantOfCurrentUser !== undefined) {
        const payload: RemoveMemberPayload = {
          adminId: participantOfCurrentUser.id,
          participantId: selectedRemoveMember.id,
        }

        MySocket.removeOneMemberOutOfGroup(
          currentChat,
          selectedRemoveMember,
          currentChat.participantResponse.map((parti) => parti.user)
        )

        setSelectedParticipant(undefined)
        dispatch(removeParticipant(payload))

        showMessageHandlerResultToSnackbar(
          true,
          '???? xo?? th??nh vi??n ' +
            selectedRemoveMember.user.fullName +
            ' kh???i nh??m',
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
    if (currentChat && currentUser && participant) {
      const participantOfCurrentUser = currentChat?.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (participantOfCurrentUser !== undefined) {
        const grantPayloadType: GrantPermissionPayloadType = {
          adminId: participantOfCurrentUser.id,
          participantId: participant.id,
          role:
            selection === GrantOrRevokeEnum.GRANT
              ? ParticipantRoleEnum.MOD
              : ParticipantRoleEnum.MEM,
        }

        setSelectedParticipant(undefined)

        dispatch(grantPermission(grantPayloadType))

        MySocket.changeRoleOfParticipant(
          currentChat,
          participant,
          grantPayloadType.role,
          currentChat.participantResponse.map((parti) => parti.user)
        )
        showMessageHandlerResultToSnackbar(
          true,
          `???? ${
            selection === GrantOrRevokeEnum.GRANT
              ? ' g??n quy???n ??i???u h??nh cho th??nh vi??n '
              : ' thu h???i quy???n ??i???u h??nh c???a th??nh vi??n '
          }` + participant.user.fullName,
          dispatch,
          setHandlerResult
        )
      }
    }
  }

  const updateStatusForParticipant = () => {
    if (currentUser && currentChat && participant !== undefined) {
      const admin = currentChat.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (admin !== undefined) {
        const status =
          participant.status === ParticipantStatusEnum.MUTED
            ? ParticipantStatusEnum.STABLE
            : ParticipantStatusEnum.MUTED

        MySocket.changeStatusForParticipant(
          participant.user,
          currentChat,
          status
        )

        dispatch(
          updateStatusOfParticipant({
            adminId: admin.id,
            participantId: participant.id,
            status,
          })
        )

        showMessageHandlerResultToSnackbar(
          true,
          `???? c???p nh???t tr???ng th??i cho th??nh vi??n ${participant.user.fullName}`,
          dispatch,
          setHandlerResult
        )
      }
    }
  }

  const onBackToViewGroupOverlay = () => {
    setSelectedParticipant(undefined)
  }

  const onCloseViewPaticipantInfo = () => {
    setSelectedParticipant(undefined)
    dispatch(toggleViewGroupInfoOverlay())
  }

  const onBanOrUnbanMember = () => {
    updateStatusForParticipant()
    setSelectedParticipant(undefined)
  }

  const onRemoveMember = () => {
    setSelectedRemoveMember(participant)
    confirmRemoveParticipant()
  }

  return (
    <div className='w-full'>
      <Stack direction={'column'} spacing={1} sx={{ width: '100%' }}>
        <div className='flex justify-between items-center px-5 py-5 bg-white'>
          <div className='flex justify-start items-center'>
            <Button
              onClick={onBackToViewGroupOverlay}
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
              Th??ng tin th??nh vi??n
            </span>
          </div>
          <div>
            <Button
              onClick={onCloseViewPaticipantInfo}
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
            {roleOfCurrentUser === ParticipantRoleEnum.ADMIN &&
            participant?.role === ParticipantRoleEnum.MEM ? (
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
                  Trao quy???n ??i???u h??nh nh??m
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
                  Thu h???i quy???n ??i???u h??nh nh??m
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
                  <div
                    className='px-5 py-3 cursor-pointer hover:bg-gray-200'
                    onClick={onBanOrUnbanMember}
                  >
                    {participant?.status === ParticipantStatusEnum.STABLE ? (
                      <>
                        <BlockOutlined
                          sx={{ color: '#cf0632', width: 26, height: 26 }}
                        />
                        <span className='ml-5 text-[#cf0632]'>
                          Ch???n g???i tin nh???n
                        </span>
                      </>
                    ) : (
                      <>
                        <ThumbUpAltOutlined
                          sx={{ color: '#1d4ed8', width: 26, height: 26 }}
                        />
                        <span className='ml-5 text-[#1d4ed8]'>
                          Cho ph??p nh???n tin tr??? l???i
                        </span>
                      </>
                    )}
                  </div>
                )}
                {participant !== undefined &&
                currentChat &&
                currentUser &&
                getRoleOfCurrentUserInConversation(currentUser, currentChat) !==
                  ParticipantRoleEnum.MEM &&
                participant.role !== ParticipantRoleEnum.ADMIN ? (
                  <div
                    className='px-5 py-3 cursor-pointer hover:bg-gray-200'
                    onClick={onRemoveMember}
                  >
                    <PersonOffOutlined
                      sx={{ color: '#cf0632', width: 26, height: 26 }}
                    />
                    <span className='ml-5 text-[#cf0632]'>Xo?? kh???i nh??m</span>
                  </div>
                ) : (
                  <></>
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
          title={'B???n ch???c ch???n mu???n xo?? th??nh vi??n n??y ch????'}
          message={'H??y quy???t ?????nh k?? v?? thao t??c n??y kh??ng th??? thu h???i!'}
          reject={() => {
            setSelectedRemoveMember(undefined)
            setOpenConfirmRemoveOverlay(false)
          }}
          resolve={removeParti}
          resolveBtnLabel={'Xo?? th??nh vi??n n??y'}
        />
      </div>
    </div>
  )
}

export default ViewParticipantInfo
