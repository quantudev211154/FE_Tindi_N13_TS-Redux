import axios from 'axios'
import {
  AttachFileTypeEnum,
  AttachmentType,
} from '../../redux/types/MessageTypes'

export const getTypeOfAttachment = (
  attachment: AttachmentType
): AttachFileTypeEnum => {
  const fileName = attachment.fileName
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i

  if (imageRegex.test(fileName)) return AttachFileTypeEnum.IMAGE
  return AttachFileTypeEnum.FILE
}

export const dowloadAttachmentsListOfMessage = async (
  attachmentList: AttachmentType[]
) => {
  for (const iterator of attachmentList) {
    // let aTag = document.createElement('a')
    // aTag.style.display = 'none'
    // aTag.href = iterator.fileUrl
    // aTag.setAttribute('download', iterator.fileName)
    // document.body.appendChild(aTag)

    // aTag.click()

    // aTag.parentNode?.removeChild(aTag)
    await axios
      .get(iterator.fileUrl, {
        responseType: 'blob',
      })
      .then((res) => {
        let blob = new Blob(res.data)
        let url = window.URL.createObjectURL(blob)

        let aTag = document.createElement('a')
        aTag.style.display = 'none'
        aTag.href = url
        aTag.download = iterator.fileName
        aTag.click()
        window.URL.revokeObjectURL(url)
      })
  }
}
