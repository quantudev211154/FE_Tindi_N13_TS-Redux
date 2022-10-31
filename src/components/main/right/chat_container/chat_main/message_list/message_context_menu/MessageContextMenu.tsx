import {
  ContentCopy,
  DeleteOutline,
  DownloadOutlined,
  ForwardOutlined,
  ReplyOutlined,
} from '@mui/icons-material'
import { messageContextmenuState } from '../../../../../../../redux/slices/MessageContextmenuSlice'
import { MessageTypeEnum } from '../../../../../../../redux/types/MessageTypes'
import { useAppSelector } from '../../../../../../../redux_hooks'
import MessageContextMenuItem from './MessageContextMenuItem'
import { copyMessageTextToClipboard } from './MessageContextMenuItemHandler'

const MessageContextMenu = () => {
  const {
    currentMessage,
    currentPageX,
    currentPageY,
    isOverflowScreentHeight,
  } = useAppSelector(messageContextmenuState)

  if (currentMessage?.id === undefined) return <></>

  return (
    <div
      style={{
        left: currentPageX,
        top: currentPageY,
        transform: isOverflowScreentHeight ? `translate(0, -100%)` : 'none',
      }}
      className='transition-all absolute px-1 py-2 rounded-lg bg-[rgba(255,255,255,0.733333)] backdrop-blur-[5px] z-[80] min-w-[15rem] max-h-56 overflow-y-scroll'
    >
      <MessageContextMenuItem
        icon={<ReplyOutlined sx={{ fill: '#706f6f' }} />}
        label='Trả lời'
        message={currentMessage}
        handler={copyMessageTextToClipboard}
      />
      {currentMessage.type === MessageTypeEnum.TEXT ? (
        <MessageContextMenuItem
          icon={<ContentCopy sx={{ fill: '#707579' }} />}
          label='Sao chép nội dung'
          message={currentMessage}
          handler={copyMessageTextToClipboard}
        />
      ) : (
        <></>
      )}
      <MessageContextMenuItem
        icon={<ForwardOutlined sx={{ fill: '#707579' }} />}
        label='Chuyển tiếp'
        message={currentMessage}
        handler={copyMessageTextToClipboard}
      />
      {currentMessage.type !== MessageTypeEnum.TEXT ? (
        <MessageContextMenuItem
          icon={<DownloadOutlined sx={{ fill: '#707579' }} />}
          label='Tải xuống'
          message={currentMessage}
          handler={copyMessageTextToClipboard}
        />
      ) : (
        <></>
      )}
      <MessageContextMenuItem
        icon={<DeleteOutline sx={{ fill: '#e5544f' }} />}
        label='Thu hồi'
        handler={copyMessageTextToClipboard}
        message={currentMessage}
        warning={true}
      />
    </div>
  )
}

export default MessageContextMenu
