import { Button, Modal } from '@mui/material'

type Props = {
  open: boolean
  title: string
  message: string
  reject: Function
  resolve: Function
  resolveBtnLabel: string
}

const ConfirmDangerAction = ({
  open,
  title,
  message,
  reject,
  resolve,
  resolveBtnLabel,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        reject()
      }}
    >
      <div className='w-2/3 max-h-[90vh] overflow-y-auto md:w-1/4 px-5 py-3 rounded-xl absolute left-1/2 top-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white'>
        <div>
          <p className='font-medium mb-3 text-lg'>{title}</p>
          <p className='text-red-600'>{message}</p>
        </div>
        <div className='w-full flex justify-end items-center pt-3'>
          <Button
            disableElevation
            onClick={() => {
              reject()
            }}
            variant='contained'
            sx={{
              textTransform: 'none',
              bgcolor: 'transparent',
              color: '#185a94',
              '&:hover': { bgcolor: '#1472c4', color: 'white' },
            }}
          >
            Huỷ
          </Button>
          <Button
            onClick={() => {
              reject()
              resolve()
            }}
            disableElevation
            variant='contained'
            sx={{
              textTransform: 'none',
              bgcolor: 'transparent',
              color: '#185a94',
              '&:hover': { bgcolor: '#cc2f54', color: 'white' },
            }}
          >
            {resolveBtnLabel}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDangerAction
