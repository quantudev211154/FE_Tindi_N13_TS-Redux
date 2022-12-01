import { MessageType } from '../../../../../../../redux/types/MessageTypes'
import { useAppSelector } from '../../../../../../../redux_hooks'
import { compareDate } from '../../../../../../../utilities/date_utils/Compare_Date'
import { parseDateByDayMonthYear } from '../../../../../../../utilities/date_utils/ParseDate'
import { findPreviousMessage } from '../../../../../../../utilities/message_utils/MessageUtils'
import { conversationDetailState } from './../../../../../../../redux/slices/ConversationDetailSlice'

type Props = {
  item: MessageType
}

const DateDivider = ({ item }: Props) => {
  const { messageList } = useAppSelector(conversationDetailState)

  if (messageList.length === 0) return <></>

  if (
    !findPreviousMessage(item, messageList) ||
    messageList.indexOf(item) === 0
  )
    return (
      <div className='relative w-full py-2 flex justify-center items-center'>
        <span className='px-5 py-1 rounded-2xl text-[.9rem] bg-gray-400 text-white opacity-80'>
          {parseDateByDayMonthYear(item.createdAt)}
        </span>
      </div>
    )

  return compareDate(
    findPreviousMessage(item, messageList)!.createdAt,
    item.createdAt
  ) ? (
    <></>
  ) : (
    <div className='relative w-full py-2 flex justify-center items-center'>
      <span className='px-5 py-1 rounded-2xl text-[.9rem] bg-gray-400 text-white opacity-80'>
        {parseDateByDayMonthYear(item.createdAt)}
      </span>
    </div>
  )
}

export default DateDivider
