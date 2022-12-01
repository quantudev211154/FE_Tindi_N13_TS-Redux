import { authState } from '../../../../../../../redux/slices/AuthSlice'
import {
  AttachFileTypeEnum,
  MessageType,
} from '../../../../../../../redux/types/MessageTypes'
import { useAppSelector } from '../../../../../../../redux_hooks'
import { getTypeOfAttachment } from '../../../../../../../utilities/message_utils/MessageUtils'

type Props = {
  replyMessage: MessageType
}

const ReplyMessage = ({ replyMessage }: Props) => {
  const { currentUser } = useAppSelector(authState)

  if (!replyMessage) return <></>

  return (
    <>
      {currentUser && replyMessage.replyTo ? (
        <div className='px-2 pt-1 w-full'>
          <a
            href={`#msg#${replyMessage.replyTo.id}`}
            className='flex w-full justify-start items-center pl-2 py-1 pr-1 transition-all hover:bg-gray-300 border-l-2 border-blue-700 '
          >
            {replyMessage.replyTo &&
            replyMessage.replyTo.attachmentResponseList &&
            getTypeOfAttachment(
              replyMessage.replyTo.attachmentResponseList[0]
            ) === AttachFileTypeEnum.IMAGE ? (
              <img
                src={replyMessage.replyTo.attachmentResponseList[0].fileUrl}
                className='w-10 h-10 mr-2 rounded-md object-cover'
              />
            ) : replyMessage.replyTo &&
              replyMessage.replyTo.attachmentResponseList &&
              getTypeOfAttachment(
                replyMessage.replyTo.attachmentResponseList[0]
              ) === AttachFileTypeEnum.FILE ? (
              <div className='mr-3 w-10 h-10 rounded-md flex justify-center items-center bg-slate-400'>
                <span className='text-white font-medium uppercase'>File</span>
              </div>
            ) : (
              <></>
            )}
            <div className='flex flex-col w-full'>
              <span className='font-medium text-sm text-blue-700 '>
                {replyMessage.replyTo.sender.id === currentUser.id
                  ? 'Bạn'
                  : replyMessage.replyTo.sender.fullName}
              </span>
              <p className='w-full text-sm whitespace-pre-wrap overflow-hidden text-ellipsis break-all'>
                {replyMessage.replyTo.message}
              </p>
            </div>
          </a>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default ReplyMessage
