import {
  ContentCopy,
  DeleteOutline,
  DownloadOutlined,
  ForwardOutlined,
  ReplyOutlined,
  WhatshotOutlined,
} from '@mui/icons-material'
import { authState } from '../../../../../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../../../../../redux/slices/ControlOverlaysSlice'
import { conversationDetailActions } from '../../../../../../../redux/slices/ConversationDetailSlice'
import {
  messageContextmenuActions,
  messageContextmenuState,
} from '../../../../../../../redux/slices/MessageContextmenuSlice'
import { revokeOneMessage } from '../../../../../../../redux/thunks/MessageThunks'
import {
  MessageStatusEnum,
  MessageType,
  MessageTypeEnum,
} from '../../../../../../../redux/types/MessageTypes'
import { UserType } from '../../../../../../../redux/types/UserTypes'
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../redux_hooks'
import { MySocket } from '../../../../../../../services/TindiSocket'
import { calTransformStyleForContextMenu } from '../../../../../../../utilities/context_menu/ContextMenu'
import { showMessageHandlerResultToSnackbar } from '../../../../../../../utilities/message_handler_snackbar/ShowMessageHandlerResultToSnackbar'
import { dowloadAttachmentsListOfMessage } from '../../../../../../../utilities/message_utils/MessageUtils'
import MessageContextMenuItem from './MessageContextMenuItem'
import { conversationsControlState } from './../../../../../../../redux/slices/ConversationsControlSlice'
import { getTeammateInSingleConversation } from '../../../../../../../utilities/conversation/ConversationUtils'
import { ConversationType } from '../../../../../../../redux/types/ConversationTypes'
import { useEffect } from 'react'
import { SocketEventEnum } from '../../../../../../../constants/SocketConstant'

const MessageContextMenu = () => {
  const { setHandlerResult } = messageContextmenuActions
  const { currentChat } = useAppSelector(conversationsControlState)
  const { currentUser } = useAppSelector(authState)
  const {
    currentMessage,
    currentPageX,
    currentPageY,
    isOverflowScreenHeight,
    isOverflowScreenWidth,
  } = useAppSelector(messageContextmenuState)
  const dispatch = useAppDispatch()
  const { revokeMessage } = conversationDetailActions
  const { toggleForwardMessageOverlay } = controlOverlaysActions

  if (currentMessage === undefined) return <></>

  const copyMessageTextToClipboard = () => {
    navigator.clipboard.writeText(currentMessage.message)

    showMessageHandlerResultToSnackbar(
      true,
      'Đã sao chép nội dung vào clipboard',
      dispatch,
      setHandlerResult
    )
  }

  const revokeChosenMessage = () => {
    dispatch(revokeMessage(currentMessage))
    dispatch(revokeOneMessage(currentMessage.id as number))

    MySocket.revokeMessage(
      currentChat as ConversationType,
      currentMessage as MessageType,
      getTeammateInSingleConversation(
        currentUser as UserType,
        currentChat as ConversationType
      ).user.id
    )

    showMessageHandlerResultToSnackbar(
      true,
      'Đã thu hồi tin nhắn',
      dispatch,
      setHandlerResult
    )
  }

  const showForwardMessageOverlay = () => {
    dispatch(toggleForwardMessageOverlay())

    showMessageHandlerResultToSnackbar(
      undefined,
      'Đã thu hồi tin nhắn',
      dispatch,
      setHandlerResult
    )
  }

  const dowloadAttachmentOfMessage = () => {
    const attachmentList = currentMessage.attachmentResponseList

    if (attachmentList) {
      dowloadAttachmentsListOfMessage(attachmentList)
    }

    showMessageHandlerResultToSnackbar(
      undefined,
      'Đang tải xuống',
      dispatch,
      setHandlerResult
    )
  }

  return (
    <>
      {currentMessage.delete ? (
        <></>
      ) : (
        <div
          style={{
            left: currentPageX,
            top: currentPageY,
            transform: calTransformStyleForContextMenu(
              isOverflowScreenHeight,
              isOverflowScreenWidth
            ),
          }}
          className='transition-all absolute px-1 py-2 rounded-lg bg-[rgba(255,255,255,0.733333)] backdrop-blur-[5px] z-[80] min-w-[15rem] max-h-56 overflow-y-scroll'
        >
          <MessageContextMenuItem
            icon={<ReplyOutlined sx={{ fill: '#706f6f' }} />}
            label='Trả lời'
            handler={copyMessageTextToClipboard}
          />
          <MessageContextMenuItem
            icon={<ContentCopy sx={{ fill: '#707579' }} />}
            label='Sao chép nội dung'
            handler={copyMessageTextToClipboard}
          />
          <MessageContextMenuItem
            icon={<ForwardOutlined sx={{ fill: '#707579' }} />}
            label='Chuyển tiếp'
            handler={showForwardMessageOverlay}
          />
          {currentMessage.attachmentResponseList ? (
            <MessageContextMenuItem
              icon={<DownloadOutlined sx={{ fill: '#707579' }} />}
              label='Tải xuống'
              handler={dowloadAttachmentOfMessage}
            />
          ) : (
            <></>
          )}
          {currentMessage.sender.id === (currentUser as UserType).id ? (
            <>
              <MessageContextMenuItem
                icon={<DeleteOutline sx={{ fill: '#cf0632' }} />}
                label='Xoá chỉ ở phía tôi'
                handler={revokeChosenMessage}
                warning={true}
              />
              <MessageContextMenuItem
                icon={<WhatshotOutlined sx={{ fill: '#cf0632' }} />}
                label='Thu hồi ở cả hai phía'
                handler={revokeChosenMessage}
                warning={true}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  )
}

export default MessageContextMenu
