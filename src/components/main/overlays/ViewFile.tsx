import { CloseOutlined, Download } from '@mui/icons-material'
import { Button, Modal } from '@mui/material'
import {
  fileViewerActions,
  fileViewerState,
} from '../../../redux/slices/FileViewerSlice'
import { AttachFileTypeEnum } from '../../../redux/types/MessageTypes'
import { useAppDispatch, useAppSelector } from '../../../redux_hooks'
import {
  dowloadAttachmentsListOfMessage,
  getTypeOfAttachment,
} from '../../../utilities/message_utils/MessageUtils'

const ViewFile = () => {
  const { isOpen, currentAttachment } = useAppSelector(fileViewerState)
  const { toggleFileViewerOverlay } = fileViewerActions
  const dispatch = useAppDispatch()

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        dispatch(toggleFileViewerOverlay())
      }}
    >
      <>
        <div className='absolute right-0 top-0 py-2 pr-5'>
          <Button
            onClick={() => {
              !!currentAttachment &&
                dowloadAttachmentsListOfMessage([currentAttachment])
            }}
            variant='contained'
            sx={{
              maxWidth: '2.5rem',
              maxHeight: '2.5rem',
              minWidth: '2.5rem',
              minHeight: '2.5rem',
              borderRadius: '50%',
              bgcolor: 'lightgray',
              color: 'gray',
              mr: 2,
              '&:hover': {
                bgcolor: '#eeeee4',
                color: 'black',
              },
            }}
            disableElevation
          >
            <Download sx={{ width: 26, height: 26 }} />
          </Button>
          <Button
            onClick={() => {
              dispatch(toggleFileViewerOverlay())
            }}
            variant='contained'
            sx={{
              maxWidth: '2.5rem',
              maxHeight: '2.5rem',
              minWidth: '2.5rem',
              minHeight: '2.5rem',
              borderRadius: '50%',
              bgcolor: 'lightgray',
              color: 'gray',
              '&:hover': {
                bgcolor: '#eeeee4',
                color: 'black',
              },
            }}
            disableElevation
          >
            <CloseOutlined sx={{ width: 26, height: 26 }} />
          </Button>
        </div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          {!!currentAttachment &&
          getTypeOfAttachment(currentAttachment) ===
            AttachFileTypeEnum.IMAGE ? (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <img
                src={currentAttachment?.fileUrl}
                className='rounded-2xl max-h-[85vh] max-w-[80vw] shadow-2xl'
              />
            </div>
          ) : (
            <iframe
              className='absolute w-[90vw] md:w-[75vw] h-[95vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl max-h-[90vh] shadow-2xl'
              frameBorder='0'
              src={`https://docs.google.com/gview?url=${currentAttachment?.fileUrl}&embedded=true`}
            ></iframe>
          )}
        </div>
      </>
    </Modal>
  )
}

export default ViewFile
