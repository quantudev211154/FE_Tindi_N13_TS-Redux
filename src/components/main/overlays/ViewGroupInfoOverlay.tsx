import { Modal, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { AVATAR_LARGE } from '../../../constants/UserAvatarConstant'
import { authState } from '../../../redux/slices/AuthSlice'
import {
  controlOverlaysActions,
  controlOverlaysState,
} from '../../../redux/slices/ControlOverlaysSlice'
import { conversationsControlState } from '../../../redux/slices/ConversationsControlSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../redux/types/ConversationTypes'
import { UserType } from '../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import { getTeammateInSingleConversation } from '../../../utilities/conversation/ConversationUtils'
import GroupAvatar, { GroupAvatarSizeEnum } from '../../core/GroupAvatar'
import UserAvatar from '../../core/UserAvatar'
import ViewGroupMembers from './overlay_components/conversation_settings/ViewGroupMembers'
import ViewGroupPhotos from './overlay_components/conversation_settings/ViewGroupPhotos'
import ViewGroupHeader from './overlay_components/conversation_settings/ViewGroupHeader'
import { ParticipantType } from '../../../redux/types/ParticipantTypes'
import ViewParticipantInfo from './overlay_components/conversation_settings/participant_setting/view_group_info/ViewParticipantInfo'
import ViewAllMembers from './overlay_components/conversation_settings/participant_setting/view_group_info/ViewAllMembers'
import AddMemberToGroup from './overlay_components/conversation_settings/participant_setting/view_group_info/AddMemberToGroup'
import { contactState } from '../../../redux/slices/ContactSlice'
import { loadContacts } from '../../../redux/thunks/ContactThunk'

const ViewGroupInfoOverlay = () => {
  const { currentUser } = useAppSelector(authState)
  const { openViewGroupInfoOverlay } = useAppSelector(controlOverlaysState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const { toggleViewGroupInfoOverlay: toggleGroupSettingOverlay } =
    controlOverlaysActions
  const dispatch = useAppDispatch()
  const [teammateInSingleConversation, setTeammateInSingleConversation] =
    useState<UserType | undefined>(undefined)
  const [selectedPaticipant, setSelectedPaticipant] = useState<
    ParticipantType | undefined
  >(undefined)
  const [showViewAllMember, setShowViewAllMember] = useState(false)
  const [showAddMemeberToGroup, setShowAddMemberToGroup] = useState(false)
  const { contacts } = useAppSelector(contactState)

  useEffect(() => {
    if (!contacts && currentUser) {
      dispatch(loadContacts(currentUser.id))
    }
  }, [])

  useEffect(() => {
    currentChat?.type === ConversationTypeEnum.SINGLE
      ? setTeammateInSingleConversation(
          getTeammateInSingleConversation(
            currentUser as UserType,
            currentChat as ConversationType
          ).user
        )
      : undefined
  }, [currentChat])

  return (
    <Modal
      open={openViewGroupInfoOverlay}
      onClose={() => {
        setSelectedPaticipant(undefined)
        dispatch(toggleGroupSettingOverlay())
      }}
    >
      <div
        className='sm:w-2/3 md:w-1/3 bg-gray-200 rounded-2xl relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden
      '
      >
        <div
          style={{
            display:
              showAddMemeberToGroup || selectedPaticipant || showViewAllMember
                ? 'none'
                : 'block',
          }}
        >
          <Stack spacing={1} sx={{ width: '100%', borderRadius: '.375rem' }}>
            <ViewGroupHeader
              teammateInSingleConversation={teammateInSingleConversation}
              currentChat={currentChat}
            />
            <ViewGroupPhotos />
            <ViewGroupMembers
              setShowAddMemberToGroup={setShowAddMemberToGroup}
              setShowViewAllMember={setShowViewAllMember}
              setSelectedParticipant={setSelectedPaticipant}
            />
          </Stack>
        </div>
        <div style={{ display: selectedPaticipant ? 'block' : 'none' }}>
          <ViewParticipantInfo
            setShowViewAllMember={setShowViewAllMember}
            participant={selectedPaticipant}
            setSelectedParticipant={setSelectedPaticipant}
          />
        </div>
        <div style={{ display: showViewAllMember ? 'block' : 'none' }}>
          <ViewAllMembers setShowViewAllMember={setShowViewAllMember} />
        </div>
        <div style={{ display: showAddMemeberToGroup ? 'block' : 'none' }}>
          <AddMemberToGroup setShowAddMemberToGroup={setShowAddMemberToGroup} />
        </div>
      </div>
    </Modal>
  )
}

export default ViewGroupInfoOverlay
