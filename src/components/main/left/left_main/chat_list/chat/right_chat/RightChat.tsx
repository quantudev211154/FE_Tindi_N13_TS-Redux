import { Chip } from '@mui/material'

const RightChat = () => {
  return (
    <div className='flex-shrink-0 py-1 w-fit h-full pr-1 flex flex-col justify-betweet items-end'>
      <p className='text-[10px] pointer-events-none mb-1 text-slate-700'>
        10:02 CH
      </p>
      <Chip
        label={'123'}
        variant='filled'
        sx={{
          fontWeight: 'bold',
          bgcolor: '#c4c9cc',
          color: 'white',
          ml: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default RightChat
