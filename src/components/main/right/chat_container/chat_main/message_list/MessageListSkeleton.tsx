import { Backdrop, CircularProgress } from '@mui/material'

const MessageListSkeleton = () => {
  return (
    <Backdrop
      open={true}
      sx={{
        bgcolor: 'transparent',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color='info' />
      <span className='font-medium text-slate-600 mt-5'>
        Đợi Tindi xíu. Đang tải tin nhắn...
      </span>
    </Backdrop>
  )
}

export default MessageListSkeleton
