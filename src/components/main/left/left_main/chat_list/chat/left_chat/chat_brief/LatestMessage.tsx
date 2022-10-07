type Props = {
  senderName: string
  message: string
}

const LatestMessage = ({ senderName, message }: Props) => {
  return (
    <div className='w-full whitespace-nowrap overflow-hidden text-ellipsis break-all'>
      <span className='mr-1'>{senderName + ':'}</span>
      <span className='text-slate-600'>{message}</span>
    </div>
  )
}

export default LatestMessage
