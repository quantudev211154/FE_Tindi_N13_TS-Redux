import {
  DirectionsRunOutlined,
  CleaningServicesOutlined,
  DeleteOutline,
  InfoOutlined,
  MoreVert,
  TuneOutlined,
  AccountCircleOutlined,
  DeleteForeverOutlined,
} from '@mui/icons-material'
import { Button, Menu, MenuItem, Tooltip } from '@mui/material'
import { useState } from 'react'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../../../../../redux/slices/ControlOverlaysSlice'
import { responsiveActions } from '../../../../../../../redux/slices/Responsive'
import {
  deleteConversation as deleteConversationThunk,
  outGroupConversation,
} from '../../../../../../../redux/thunks/ConversationThunks'
import { ConversationTypeEnum } from '../../../../../../../redux/types/ConversationTypes'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'
import { MySocket } from '../../../../../../../services/TindiSocket'
import ConfirmDangerAction from '../../../../../overlays/ConfirmDangerAction'
import ManageGroup from '../../../../../overlays/ManageGroup'
import ViewGroupInfoOverlay from '../../../../../overlays/ViewGroupInfoOverlay'
import {
  conversationActions,
  conversationsControlState,
} from './../../../../../../../redux/slices/ConversationsControlSlice'

const AdvancedAction = () => {
  const { currentUser } = useAppSelector(authState)
  const { toggleViewGroupInfoOverlay, toggleManageGroupOverlay } =
    controlOverlaysActions
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const { currentChat } = useAppSelector(conversationsControlState)
  const [openDeleteChatOverlay, setOpenConfirmDeleteChatOverlay] =
    useState(false)
  const [openOutGroupOverlay, setOpenOutGroupOverlay] = useState(false)
  const { deleteConversation } = conversationActions
  const { openMessageList } = responsiveActions

  const handleOpenGroupSetting = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseGroupSetting = () => {
    setAnchorEl(null)
  }

  const deleteChat = () => {
    if (currentChat) {
      const currentUsers = currentChat.participantResponse.map(
        (parti) => parti.user
      )
      MySocket.deleteConversation(currentUsers, currentChat)

      dispatch(deleteConversation(currentChat))
      dispatch(deleteConversationThunk(currentChat.id))
      dispatch(openMessageList(false))
    }
  }

  const outGroupResolve = () => {
    if (currentChat && currentChat.type === ConversationTypeEnum.GROUP) {
      if (currentUser) {
        const participant = currentChat.participantResponse.find(
          (parti) => parti.user.id === currentUser.id
        )

        if (participant !== undefined) {
          dispatch(outGroupConversation(participant.id))
        }
      }
    }
  }

  return (
    <div className='relative'>
      <Tooltip title='Xem thêm các tuỳ chọn khác'>
        <Button
          onClick={handleOpenGroupSetting}
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
          <MoreVert sx={{ fill: 'gray', width: 26, height: 26 }} />
        </Button>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseGroupSetting}>
        {currentChat && currentChat.type === ConversationTypeEnum.SINGLE ? (
          <MenuItem
            onClick={() => {
              dispatch(toggleViewGroupInfoOverlay())
              handleCloseGroupSetting()
            }}
          >
            <AccountCircleOutlined sx={{ color: 'gray', mr: 2 }} />
            <span className='text-sm'>Xem hồ sơ</span>
          </MenuItem>
        ) : (
          <div className='hidden'></div>
        )}
        {currentChat && currentChat.type === ConversationTypeEnum.GROUP ? (
          <div>
            <MenuItem
              onClick={() => {
                dispatch(toggleViewGroupInfoOverlay())
                handleCloseGroupSetting()
              }}
            >
              <InfoOutlined sx={{ color: 'gray', mr: 2 }} />
              <span className='text-sm'>Xem thông tin nhóm</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(toggleManageGroupOverlay())
                handleCloseGroupSetting()
              }}
            >
              <TuneOutlined sx={{ color: 'gray', mr: 2 }} />
              <span className='text-sm'>Quản lý nhóm</span>
            </MenuItem>
          </div>
        ) : (
          <div className='hidden'></div>
        )}
        <MenuItem onClick={handleCloseGroupSetting}>
          <CleaningServicesOutlined sx={{ color: 'gray', mr: 2 }} />
          <span className='text-sm'>Xoá tất cả tin nhắn</span>
        </MenuItem>
        {currentChat && currentChat.type === ConversationTypeEnum.GROUP ? (
          <div>
            <MenuItem
              onClick={() => {
                setOpenOutGroupOverlay(true)
                handleCloseGroupSetting()
              }}
            >
              <DirectionsRunOutlined sx={{ color: '#cf0632', mr: 2 }} />
              <span className='text-sm text-[#cf0632]'>Rời nhóm</span>
            </MenuItem>
            {currentUser && currentUser.id === currentChat.creator.id ? (
              <MenuItem
                onClick={() => {
                  handleCloseGroupSetting()
                  setOpenConfirmDeleteChatOverlay(true)
                }}
              >
                <DeleteOutline sx={{ color: '#cf0632', mr: 2 }} />
                <span className='text-sm text-[#cf0632]'>Giải tán nhóm</span>
              </MenuItem>
            ) : (
              <div className='hidden'></div>
            )}
          </div>
        ) : (
          <div className='hidden'></div>
        )}
        {currentChat && currentChat.type === ConversationTypeEnum.SINGLE ? (
          <MenuItem
            onClick={() => {
              handleCloseGroupSetting()
              setOpenConfirmDeleteChatOverlay(true)
            }}
          >
            <DeleteForeverOutlined sx={{ color: '#cf0632', mr: 2 }} />
            <span className='text-sm text-[#cf0632]'>Xoá cuộc trò chuyện</span>
          </MenuItem>
        ) : (
          <div className='hidden'></div>
        )}
      </Menu>
      <div className='group-settings-overlay'>
        <ViewGroupInfoOverlay />
        <ManageGroup />
      </div>
      <div className='confirmOverlay'>
        <ConfirmDangerAction
          open={openDeleteChatOverlay}
          title={
            currentChat && currentChat.type === ConversationTypeEnum.GROUP
              ? 'Bạn chắc chắn muốn giải tán nhóm chứ?'
              : 'Bạn chắc chắn muốn xoá cuộc trò chuyện này chứ?'
          }
          message={'Hãy quyết định kĩ vì thao tác này không thể thu hồi!'}
          reject={() => {
            setOpenConfirmDeleteChatOverlay(false)
          }}
          resolve={deleteChat}
          resolveBtnLabel={
            currentChat?.type === ConversationTypeEnum.GROUP
              ? 'Giải tán nhóm'
              : 'Xoá'
          }
        />
        <ConfirmDangerAction
          open={openOutGroupOverlay}
          title={
            currentChat && currentChat.type === ConversationTypeEnum.GROUP
              ? 'Bạn chắc chắn muốn rời nhóm chứ?'
              : 'Bạn chắc chắn muốn rời nhóm chứ?'
          }
          message={'Hãy quyết định kĩ vì thao tác này không thể thu hồi!'}
          reject={() => {
            setOpenOutGroupOverlay(false)
          }}
          resolve={outGroupResolve}
          resolveBtnLabel={
            currentChat?.type === ConversationTypeEnum.GROUP
              ? 'Rời nhóm'
              : 'Rời nhóm'
          }
        />
      </div>
    </div>
  )
}

export default AdvancedAction
