import { ClearOutlined } from '@mui/icons-material'
import { Button, Modal, Radio, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { AVATAR_SMALL } from '../../../constants/UserAvatarConstant'
import { authState } from '../../../redux/slices/AuthSlice'
import { grantPermission } from '../../../redux/thunks/ConversationThunks'
import { GrantPermissionPayloadType } from '../../../redux/types/ConversationTypes'
import {
  ParticipantRoleEnum,
  ParticipantType,
} from '../../../redux/types/ParticipantTypes'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import {
  findParticipants,
  sortParticipantsByRole,
} from '../../../utilities/conversation/ConversationUtils'
import UserAvatar from '../../core/UserAvatar'
import {
  conversationActions,
  conversationsControlState,
} from './../../../redux/slices/ConversationsControlSlice'

type Props = {
  isOpen: boolean
  onClose: Function
  outGroup: Function
}

const GrantPermissionBeforeOutGroup = ({
  isOpen,
  onClose,
  outGroup,
}: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const inputRef = useRef<HTMLInputElement>(null)
  const [listParticipants, setListParticipants] = useState<ParticipantType[]>(
    []
  )
  const [foundParticipants, setFoundParticipants] = useState<ParticipantType[]>(
    []
  )
  const [selectedParticipant, setSelectedParticipant] = useState<
    ParticipantType | undefined
  >(undefined)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (inputRef.current && isOpen) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (currentUser && currentChat && isOpen) {
      let tmp: ParticipantType[] = sortParticipantsByRole(currentChat)

      tmp = currentChat.participantResponse.filter(
        (parti) => parti.user.id !== currentUser.id
      )

      setListParticipants(tmp)
    }
  }, [currentChat, currentUser, isOpen])

  const onTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const keyword = event.target.value

    if (listParticipants.length !== 0)
      setFoundParticipants(findParticipants(keyword, listParticipants))
  }

  const onConfirmAndOutGroup = () => {
    if (currentUser && currentChat && selectedParticipant !== undefined) {
      const currentParticipant = currentChat.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (currentParticipant !== undefined) {
        const grantPayload1: GrantPermissionPayloadType = {
          adminId: currentParticipant.id,
          participantId: currentParticipant.id,
          role: ParticipantRoleEnum.MEM,
        }
        const grantPayload2: GrantPermissionPayloadType = {
          adminId: currentParticipant.id,
          participantId: selectedParticipant.id,
          role: ParticipantRoleEnum.ADMIN,
        }
        dispatch(grantPermission(grantPayload1))
        dispatch(grantPermission(grantPayload2))
        outGroup()
        onClose()
      }
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose()
      }}
    >
      <div className='absolute w-5/6 md:w-1/3 max-h-[90vh] overflow-y-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white'>
        <div className='flex justify-between items-center px-5 py-3'>
          <span className='font-medium text-xl'>
            Chuyển giao quyền Quản trị viên
          </span>
          <Button
            onClick={() => {
              onClose()
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
        <div className='px-5 py-3'>
          <TextField
            fullWidth
            variant='standard'
            inputRef={inputRef}
            onChange={onTextFieldChange}
            placeholder='Tìm kiếm thành viên...'
          />
        </div>
        <div className='py-3 w-full max-h-72 overflow-y-auto'>
          {foundParticipants.length !== 0 &&
            foundParticipants.map((iterator) => (
              <div
                key={iterator.id}
                onClick={() => {
                  setSelectedParticipant(iterator)
                }}
                className='w-full bg-white  cursor-pointer transition-all hover:bg-gray-200 px-5 py-2 flex justify-between items-center'
              >
                <div className='flex-1 flex justify-start items-center'>
                  <Radio
                    checked={selectedParticipant?.id === iterator.id}
                    onChange={() => {
                      setSelectedParticipant(iterator)
                    }}
                    name='participants'
                    sx={{
                      mr: 2,
                      color: '#09874c',
                      '&.Mui-checked': {
                        color: '#09874c',
                      },
                    }}
                  />
                  <UserAvatar
                    name={iterator.user.fullName}
                    avatar={iterator.user.avatar}
                    size={AVATAR_SMALL}
                  />
                  <span className='ml-2 font-medium'>
                    {iterator.user.fullName}
                  </span>
                </div>
                <span className='text-blue-700 font-medium'>
                  {iterator.role === ParticipantRoleEnum.MOD
                    ? 'Điều hành viên'
                    : ''}
                </span>
              </div>
            ))}
          {foundParticipants.length === 0 &&
            listParticipants.map((iterator) => (
              <div
                key={iterator.id}
                onClick={() => {
                  setSelectedParticipant(iterator)
                }}
                className='w-full bg-white cursor-pointer transition-all hover:bg-gray-200 px-5 py-2 flex justify-between items-center'
              >
                <div className='flex-1 flex justify-start items-center'>
                  <Radio
                    checked={selectedParticipant?.id === iterator.id}
                    onChange={() => {
                      setSelectedParticipant(iterator)
                    }}
                    name='participants'
                    sx={{
                      mr: 2,
                      color: '#09874c',
                      '&.Mui-checked': {
                        color: '#09874c',
                      },
                    }}
                  />
                  <UserAvatar
                    name={iterator.user.fullName}
                    avatar={iterator.user.avatar}
                    size={AVATAR_SMALL}
                  />
                  <span className='ml-2 font-medium'>
                    {iterator.user.fullName}
                  </span>
                </div>
                <span className='text-blue-700 font-medium'>
                  {iterator.role === ParticipantRoleEnum.MOD
                    ? 'Điều hành viên'
                    : ''}
                </span>
              </div>
            ))}
        </div>
        <div className='flex justify-end items-center px-5 py-3'>
          <Button
            disableElevation
            onClick={() => {
              onClose()
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
            disabled={selectedParticipant === undefined ? true : false}
            onClick={onConfirmAndOutGroup}
            disableElevation
            variant='contained'
            sx={{
              textTransform: 'none',
              bgcolor: 'transparent',
              color: '#185a94',
              '&:hover': { bgcolor: '#1472c4', color: 'white' },
            }}
          >
            Xác nhận và rời nhóm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default GrantPermissionBeforeOutGroup
