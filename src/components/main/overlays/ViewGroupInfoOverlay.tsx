import { Modal, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
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
import ViewGroupMembers from './overlay_components/conversation_settings/ViewGroupMembers'
import ViewGroupAttachments from './overlay_components/conversation_settings/ViewGroupAttachments'
import ViewGroupHeader from './overlay_components/conversation_settings/ViewGroupHeader'
import { ParticipantType } from '../../../redux/types/ParticipantTypes'
import ViewParticipantInfo from './overlay_components/conversation_settings/participant_setting/view_group_info/ViewParticipantInfo'
import ViewAllMembers from './overlay_components/conversation_settings/participant_setting/view_group_info/ViewAllMembers'
import AddMemberToGroup from './overlay_components/conversation_settings/participant_setting/view_group_info/AddMemberToGroup'
import { contactState } from '../../../redux/slices/ContactSlice'
import { loadContacts } from '../../../redux/thunks/ContactThunk'
import { useQuery } from '@tanstack/react-query'
import { loadAttachmentsOfConver } from '../../../api/Message.api'
import ViewAllImages from './overlay_components/conversation_settings/participant_setting/view_group_info/ViewAllImages'
import ViewAllFiles from './overlay_components/conversation_settings/participant_setting/view_group_info/ViewAllFiles'
import { filterAttachmentByType } from '../../../utilities/attachment_utils/AttachmentUtils'
import { AttachFileTypeEnum } from '../../../redux/types/MessageTypes'

export enum CurrentViewGroupOverlayEnum {
  DEFAULT,
  VIEW_IMAGES,
  VIEW_FILES,
  VIEW_ALL_MEMBERS,
  ADD_MEMBER_TO_GROUP,
  VIEW_ALL_IMAGES,
  VIEW_ALL_FILES,
}

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
  const { contacts } = useAppSelector(contactState)
  const [currentOverlay, setCurrentOverlay] =
    useState<CurrentViewGroupOverlayEnum>(CurrentViewGroupOverlayEnum.DEFAULT)

  const { data } = useQuery({
    queryKey: [currentChat, openViewGroupInfoOverlay],
    queryFn: () => loadAttachmentsOfConver(currentChat),
  })

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

  const changeOverlay = (overlay: CurrentViewGroupOverlayEnum) => {
    setCurrentOverlay(overlay)
  }

  const onCloseModal = () => {
    setSelectedPaticipant(undefined)
    dispatch(toggleGroupSettingOverlay())
  }

  return (
    <Modal open={openViewGroupInfoOverlay} onClose={onCloseModal}>
      <div
        className='w-5/6 max-h-[90vh] overflow-y-auto md:w-1/3 bg-gray-200 rounded-2xl relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden
      '
      >
        {currentOverlay === CurrentViewGroupOverlayEnum.DEFAULT ? (
          <div style={{ display: selectedPaticipant ? 'none' : 'block' }}>
            <Stack spacing={1} sx={{ width: '100%', borderRadius: '.375rem' }}>
              <ViewGroupHeader
                teammateInSingleConversation={teammateInSingleConversation}
                currentChat={currentChat}
              />
              {data ? (
                <ViewGroupAttachments
                  changeOverlay={changeOverlay}
                  attachments={data.data}
                />
              ) : (
                <></>
              )}
              {currentChat &&
              currentChat.type === ConversationTypeEnum.GROUP ? (
                <ViewGroupMembers
                  changeOverlay={changeOverlay}
                  setSelectedParticipant={setSelectedPaticipant}
                />
              ) : (
                <></>
              )}
            </Stack>
          </div>
        ) : (
          <></>
        )}
        <div style={{ display: selectedPaticipant ? 'block' : 'none' }}>
          <ViewParticipantInfo
            participant={selectedPaticipant}
            setSelectedParticipant={setSelectedPaticipant}
          />
        </div>
        {currentOverlay === CurrentViewGroupOverlayEnum.VIEW_ALL_MEMBERS ? (
          <ViewAllMembers changeOverlay={changeOverlay} />
        ) : (
          <></>
        )}
        {currentOverlay === CurrentViewGroupOverlayEnum.ADD_MEMBER_TO_GROUP ? (
          <AddMemberToGroup changeOverlay={changeOverlay} />
        ) : (
          <></>
        )}
        {data &&
        currentOverlay === CurrentViewGroupOverlayEnum.VIEW_ALL_IMAGES ? (
          <ViewAllImages
            images={filterAttachmentByType(AttachFileTypeEnum.IMAGE, data.data)}
            changeOverlay={changeOverlay}
          />
        ) : (
          <></>
        )}
        {data &&
        currentOverlay === CurrentViewGroupOverlayEnum.VIEW_ALL_FILES ? (
          <ViewAllFiles
            files={filterAttachmentByType(AttachFileTypeEnum.FILE, data.data)}
            changeOverlay={changeOverlay}
          />
        ) : (
          <></>
        )}
      </div>
    </Modal>
  )
}

export default ViewGroupInfoOverlay
