import JSZip from 'jszip'
import {
  AttachFileTypeEnum,
  AttachmentType,
  MessageType,
} from '../../redux/types/MessageTypes'

export const getTypeOfAttachment = (
  attachment: AttachmentType
): AttachFileTypeEnum => {
  const fileName = attachment.thumbnail
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i

  if (imageRegex.test(fileName)) return AttachFileTypeEnum.IMAGE
  return AttachFileTypeEnum.FILE
}

const downloadAndCompressToZipFolder = async (
  attachmentList: AttachmentType[]
) => {
  console.log(attachmentList)
  let zip = new JSZip()

  for (let iterator of attachmentList) {
    const response = await fetch(iterator.fileUrl)
    const blob = await response.blob()

    zip.file(iterator.thumbnail, blob)
  }

  zip.generateAsync({ type: 'blob' }).then((content) => {
    let customUrl = window.URL.createObjectURL(content)
    let aTag = document.createElement('a')
    aTag.style.display = 'none'
    aTag.href = customUrl
    aTag.download = 'Tindi-' + new Date().getTime().toString()
    aTag.click()
    window.URL.revokeObjectURL(customUrl)
  })
}

export const dowloadAttachmentsListOfMessage = async (
  attachmentList: AttachmentType[]
) => {
  if (attachmentList.length === 1) {
    const response = await fetch(attachmentList[0].fileUrl)
    const blob = await response.blob()

    let customUrl = window.URL.createObjectURL(blob)
    let aTag = document.createElement('a')
    aTag.style.display = 'none'
    aTag.href = customUrl
    aTag.download = attachmentList[0].fileName
    aTag.click()
    window.URL.revokeObjectURL(customUrl)
  } else {
    downloadAndCompressToZipFolder(attachmentList)
  }
}

export const findMessage = (
  keyword: string,
  messageList: MessageType[]
): MessageType[] => {
  if (keyword === '') return []

  const found: MessageType[] = []

  for (let message of messageList) {
    if (message.message.includes(keyword)) found.push(message)
  }

  return found
}
