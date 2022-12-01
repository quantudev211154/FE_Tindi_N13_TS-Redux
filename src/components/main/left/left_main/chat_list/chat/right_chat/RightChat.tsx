import { ConversationType } from '../../../../../../../redux/types/ConversationTypes'
import { parseDateByHourAndMinutes } from '../../../../../../../utilities/date_utils/ParseDate'

type Props = {
  chat: ConversationType
}

const RightChat = ({ chat }: Props) => {
  return (
    <div className='flex-shrink-0 py-1 w-fit h-full pr-1 flex flex-col justify-betweet items-end'>
      <p className='text-[10px] pointer-events-none mb-1 text-slate-700'>
        {chat.messageLatest &&
          parseDateByHourAndMinutes(chat.messageLatest?.createdAt)}
      </p>
    </div>
  )
}

export default RightChat
