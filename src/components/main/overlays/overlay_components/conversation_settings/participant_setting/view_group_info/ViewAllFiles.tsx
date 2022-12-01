import { ArrowBack, Download } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { fileViewerActions } from '../../../../../../../redux/slices/FileViewerSlice'
import { AttachmentType } from '../../../../../../../redux/types/MessageTypes'
import { useAppDispatch } from '../../../../../../../redux_hooks'
import { parseDateByDayMonthYear } from '../../../../../../../utilities/date_utils/ParseDate'
import { dowloadAttachmentsListOfMessage } from '../../../../../../../utilities/message_utils/MessageUtils'
import { CurrentViewGroupOverlayEnum } from '../../../../ViewGroupInfoOverlay'

type Props = {
  changeOverlay: Function
  files: AttachmentType[]
}

const ViewAllFiles = ({ changeOverlay, files }: Props) => {
  const dispatch = useAppDispatch()
  const { setCurrentAttachment } = fileViewerActions

  return (
    <div className='w-full bg-white'>
      <div className='flex justify-start items-center px-5 py-3'>
        <Button
          onClick={() => {
            changeOverlay(CurrentViewGroupOverlayEnum.DEFAULT)
          }}
          variant='contained'
          sx={{
            maxWidth: '2.5rem',
            maxHeight: '2.5rem',
            minWidth: '2.5rem',
            minHeight: '2.5rem',
            borderRadius: '50%',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: '#eeeee4',
            },
          }}
          disableElevation
        >
          <ArrowBack sx={{ fill: 'gray', width: 26, height: 26 }} />
        </Button>
        <span className='font-medium text-lg ml-3 text-slate-800'>
          Tất cả file
        </span>
      </div>
      <div className='flex-col px-5 py-1'>
        {files.map((file) => (
          <div
            key={file.id}
            className='flex justify-start items-center p-3 rounded-2xl bg-slate-500 mb-1'
          >
            <Tooltip title={`Tải xuống file ${file.thumbnail}`}>
              <span
                className='text-white cursor-pointer'
                onClick={() => {
                  dowloadAttachmentsListOfMessage([file])
                }}
              >
                <Download sx={{ width: '2rem', height: '2rem' }} />
              </span>
            </Tooltip>
            <div className='flex flex-col ml-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis break-all'>
              <Tooltip title={`Xem trước file ${file.thumbnail}`}>
                <span
                  onClick={() => {
                    dispatch(setCurrentAttachment(file))
                  }}
                  className='text-gray-100 whitespace-nowrap overflow-hidden text-ellipsis break-all cursor-pointer hover:underline'
                >
                  {file.thumbnail}
                </span>
              </Tooltip>
              <span className='text-sm text-gray-100 '>
                {parseDateByDayMonthYear(file.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewAllFiles
