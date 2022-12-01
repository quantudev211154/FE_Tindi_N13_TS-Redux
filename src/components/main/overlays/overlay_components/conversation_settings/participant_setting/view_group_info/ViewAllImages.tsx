import { ArrowBack } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { fileViewerActions } from '../../../../../../../redux/slices/FileViewerSlice'
import { AttachmentType } from '../../../../../../../redux/types/MessageTypes'
import { useAppDispatch } from '../../../../../../../redux_hooks'
import { parseDateByDayMonthYear } from '../../../../../../../utilities/date_utils/ParseDate'
import { CurrentViewGroupOverlayEnum } from '../../../../ViewGroupInfoOverlay'

type Props = {
  changeOverlay: Function
  images: AttachmentType[]
}

const ViewAllImages = ({ changeOverlay, images }: Props) => {
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
          Tất cả hình ảnh
        </span>
      </div>
      <div className='px-5 py-2 flex flex-row justify-start flex-wrap'>
        {images.map((image) => (
          <Tooltip
            title={
              <div>
                <p className='text-sm'>Tên: {image.thumbnail}</p>
                <p className='text-sm'>
                  Ngày gửi: {parseDateByDayMonthYear(image.createdAt)}
                </p>
              </div>
            }
          >
            <img
              src={image.fileUrl}
              key={image.id}
              className='w-24 h-24 object-cover rounded-md p-[2px] transition-all cursor-pointer hover:transform hover:scale-105'
              onClick={() => {
                dispatch(setCurrentAttachment(image))
              }}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  )
}

export default ViewAllImages
