type Props = {}
import LatestMessage from './LatestMessage'

const ChatBrief = (props: Props) => {
  return (
    <div className='ml-3 h-full flex flex-col justify-between overflow-hidden text-black text-left'>
      <p className='text-[15px] font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis break-all'>
        Anh Dũng Hoàng
      </p>
      <LatestMessage senderName='Khoa' message='Ban co nha chu?' />
    </div>
  )
}

export default ChatBrief
