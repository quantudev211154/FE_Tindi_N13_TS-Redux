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
import {
  deleteMessageInServer,
  revokeOneMessageInServer,
} from '../../../../../../../redux/thunks/MessageThunks'
import { MessageType } from '../../../../../../../redux/types/MessageTypes'
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
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../../../../../redux/types/ConversationTypes'

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
  const { revokeMessage, deleteMessage, setReplyingMessage } =
    conversationDetailActions
  const { toggleForwardMessageOverlay } = controlOverlaysActions

  if (currentMessage === undefined) return <></>

  const copyMessageTextToClipboard = () => {
    navigator.clipboard.writeText(currentMessage.message)

    showMessageHandlerResultToSnackbar(
      true,
      '???? sao ch??p n???i dung v??o clipboard',
      dispatch,
      setHandlerResult
    )
  }

  const replyMessage = () => {
    if (currentMessage) dispatch(setReplyingMessage(currentMessage))
  }

  const deleteChosenMessage = () => {
    if (currentChat && currentUser) {
      const currentParti = currentChat.participantResponse.find(
        (parti) => parti.user.id === currentUser.id
      )

      if (!!currentParti && !!currentMessage) {
        dispatch(deleteMessage([currentMessage, currentParti]))
        dispatch(
          deleteMessageInServer({
            messageId: currentMessage.id as number,
            participantId: currentParti.id,
            createdAt: new Date().toISOString(),
          })
        )

        showMessageHandlerResultToSnackbar(
          true,
          '???? xo?? tin nh???n ??? ph??a b???n',
          dispatch,
          setHandlerResult
        )
      }
    }
  }

  const revokeChosenMessage = () => {
    const tmp = {
      ...currentMessage,
      delete: true,
    }

    dispatch(revokeMessage(tmp))
    dispatch(revokeOneMessageInServer(tmp.id as number))

    if (currentChat) {
      if (currentChat.type == ConversationTypeEnum.SINGLE) {
        MySocket.revokeMessage(
          currentChat as ConversationType,
          tmp as MessageType,
          [
            getTeammateInSingleConversation(
              currentUser as UserType,
              currentChat as ConversationType
            ).user,
          ]
        )
      } else {
        MySocket.revokeMessage(
          currentChat as ConversationType,
          tmp as MessageType,
          currentChat.participantResponse.map((parti) => parti.user)
        )
      }
    }

    showMessageHandlerResultToSnackbar(
      true,
      '???? thu h???i tin nh???n ??? c??? hai ph??a',
      dispatch,
      setHandlerResult
    )
  }

  const showForwardMessageOverlay = () => {
    dispatch(toggleForwardMessageOverlay())

    showMessageHandlerResultToSnackbar(
      undefined,
      '???? thu h???i tin nh???n',
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
      true,
      '??ang t???i xu???ng',
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
          className='transition-all absolute px-1 py-2 rounded-lg bg-[rgba(255,255,255,0.733333)] backdrop-blur-[5px] z-[80] min-w-[15rem] max-h-64 overflow-y-scroll'
        >
          <MessageContextMenuItem
            icon={<ReplyOutlined sx={{ fill: '#706f6f' }} />}
            label='Tr??? l???i'
            handler={replyMessage}
          />
          {currentMessage.message !== '' ? (
            <MessageContextMenuItem
              icon={<ContentCopy sx={{ fill: '#707579' }} />}
              label='Sao ch??p n???i dung'
              handler={copyMessageTextToClipboard}
            />
          ) : (
            <></>
          )}
          <MessageContextMenuItem
            icon={<ForwardOutlined sx={{ fill: '#707579' }} />}
            label='Chuy???n ti???p'
            handler={showForwardMessageOverlay}
          />
          {currentMessage.attachmentResponseList ? (
            <MessageContextMenuItem
              icon={<DownloadOutlined sx={{ fill: '#707579' }} />}
              label='T???i xu???ng'
              handler={dowloadAttachmentOfMessage}
            />
          ) : (
            <></>
          )}
          {currentMessage.sender.id === (currentUser as UserType).id ? (
            <>
              <MessageContextMenuItem
                icon={<DeleteOutline sx={{ fill: '#cf0632' }} />}
                label='Xo?? ch??? ??? ph??a t??i'
                handler={deleteChosenMessage}
                warning={true}
              />
              <MessageContextMenuItem
                icon={<WhatshotOutlined sx={{ fill: '#cf0632' }} />}
                label='Thu h???i ??? c??? hai ph??a'
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
