import { Skeleton } from '@mui/material'

const ChatListSkeleton = () => {
  return (
    <div className='w-full flex justify-between items-center px-[0.2rem] py-[0.5rem] rounded-md'>
      <div className='flex-1 flex justify-start items-center'>
        <Skeleton variant='circular' width={50} height={45} />
        <div className='ml-2 w-full'>
          <Skeleton variant='text' width={120} sx={{ mb: 1 }} />
          <Skeleton variant='rounded' height={20} />
        </div>
      </div>
      <div className='flex-initial flex flex-col ml-5 justify-center items-center'>
        <Skeleton variant='circular' width={25} height={25} sx={{ mb: 1 }} />
      </div>
    </div>
  )
}

export default ChatListSkeleton
