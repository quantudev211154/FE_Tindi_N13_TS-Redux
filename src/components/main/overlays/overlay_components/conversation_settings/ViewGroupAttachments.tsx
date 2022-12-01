import {
  CollectionsOutlined,
  InsertDriveFileOutlined,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { StaticAttachmentByType } from '../../../../../redux/types/FileViwerTypes'
import { AttachmentType } from '../../../../../redux/types/MessageTypes'
import { staticNumberOfAttachmentByType } from '../../../../../utilities/attachment_utils/AttachmentUtils'
import { CurrentViewGroupOverlayEnum } from '../../ViewGroupInfoOverlay'

type Props = {
  changeOverlay: Function
  attachments: AttachmentType[]
}

const ViewGroupAttachments = ({ changeOverlay, attachments }: Props) => {
  const [attachmentsNum, setAttachmentsNum] = useState<StaticAttachmentByType>({
    image: 0,
    file: 0,
  })

  useEffect(() => {
    setAttachmentsNum(staticNumberOfAttachmentByType(attachments))
  }, [])

  if (attachmentsNum.file === 0 && attachmentsNum.image === 0) return <></>

  return (
    <div className='py-1 bg-white'>
      {attachmentsNum.image !== 0 ? (
        <div
          className='flex justify-start items-center px-5 py-2 cursor-pointer hover:bg-gray-200'
          onClick={() => {
            changeOverlay(CurrentViewGroupOverlayEnum.VIEW_ALL_IMAGES)
          }}
        >
          <CollectionsOutlined sx={{ color: 'gray' }} />
          <span className='ml-5'>{attachmentsNum.image} hình ảnh</span>
        </div>
      ) : (
        <></>
      )}
      {attachmentsNum.file !== 0 ? (
        <div
          className='flex justify-start items-center px-5 py-2 cursor-pointer hover:bg-gray-200'
          onClick={() => {
            changeOverlay(CurrentViewGroupOverlayEnum.VIEW_ALL_FILES)
          }}
        >
          <InsertDriveFileOutlined sx={{ color: 'gray' }} />
          <span className='ml-5'>{attachmentsNum.file} file</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ViewGroupAttachments
