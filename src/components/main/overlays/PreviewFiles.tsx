import { Close } from '@mui/icons-material'
import { Button, Modal, TextField } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { controlOverlaysState } from '../../../redux/slices/ControlOverlaysSlice'
import { AttachFileTypeEnum } from '../../../redux/types/MessageTypes'
import { useAppSelector } from '../../../redux_hooks'

type Props = {
  files: FileList | null
  filesType: AttachFileTypeEnum
  onClosePreviewOverlay: Function
  preCaption: string
  onSendMessage: Function
}

const PreviewFiles = ({
  files,
  filesType,
  onClosePreviewOverlay,
  preCaption,
  onSendMessage,
}: Props) => {
  const { openPreviewFilesInMessage } = useAppSelector(controlOverlaysState)
  const [fileList, setFileList] = useState<ReactNode[]>([])
  const [caption, setCaption] = useState('')

  useEffect(() => {
    if (files) {
      if (filesType === AttachFileTypeEnum.IMAGE) {
        for (const iterator of files) {
          setFileList((prev) => [
            ...prev,
            <img src={URL.createObjectURL(iterator)} className='mb-1' />,
          ])
        }
      }
    }
    setCaption(preCaption)
  }, [files])

  const onCaptionFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCaption(event.target.value)
  }

  const onSendMsg = () => {
    onSendMessage(caption)
  }

  const onCloseOverlay = () => {
    setFileList([])
    // setCaption('')
    onClosePreviewOverlay()
  }

  const onCaptionFieldHitEnter = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    const pressedKeyCode = event.key

    if (pressedKeyCode === 'Enter') {
      onSendMsg()
      onCloseOverlay()
    }
  }

  return (
    <Modal
      open={openPreviewFilesInMessage}
      onClose={() => {
        onCloseOverlay()
      }}
    >
      <div className='bg-white w-1/3 p-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg'>
        <div className='w-full flex justify-between items-center mb-3'>
          <Button
            variant='contained'
            sx={{
              maxWidth: '2.5rem',
              maxHeight: '2.5rem',
              minWidth: '2.5rem',
              minHeight: '2.5rem',
              borderRadius: '50%',
              mr: 1,
              bgcolor: 'transparent',
              '&:hover': {
                bgcolor: '#d4d4d4',
              },
            }}
            disableElevation
            onClick={() => {
              onCloseOverlay()
            }}
          >
            <Close sx={{ fill: 'gray', width: '1.5rem', height: '1.5rem' }} />
          </Button>
          <span className='text-xl font-medium'>
            Gửi đi {files?.length}{' '}
            {filesType === AttachFileTypeEnum.FILE ? 'tệp' : 'ảnh'}
          </span>
          <Button
            variant='contained'
            disableElevation
            sx={{
              textTransform: 'none',
              mr: 2,
              bgcolor: '#1a6fc9',
              fontSize: '1rem',
              borderRadius: '1rem',
              '&:hover': {
                bgcolor: '#1561b3',
              },
            }}
            onClick={() => {
              onSendMsg()
              onCloseOverlay()
            }}
          >
            Gửi đi
          </Button>
        </div>
        <div className='w-full max-h-96 overflow-y-scroll bg-slate-500'>
          {files && filesType === AttachFileTypeEnum.IMAGE ? (
            fileList.map((element, index) => (
              <div key={index} className='relative'>
                <div className='absolute left-1 top-1 rounded-full w-5 h-5 bg-blue-600 flex justify-center items-center'>
                  <span className='text-white text-sm'>{index + 1}</span>
                </div>
                {element}
              </div>
            ))
          ) : (
            <></>
          )}
          {/* {filesType === AttachFileEnum.FILE ? : <></>} */}
        </div>
        <div className='mt-3'>
          <TextField
            name='caption'
            variant='outlined'
            label='Mô tả'
            placeholder='Viết xíu mô tả cho tin nhắn đỡ nhạt nào'
            fullWidth
            value={caption}
            onChange={onCaptionFieldChange}
            onKeyDown={onCaptionFieldHitEnter}
          />
        </div>
      </div>
    </Modal>
  )
}

export default PreviewFiles