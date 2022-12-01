import { StaticAttachmentByType } from '../../redux/types/FileViwerTypes'
import {
  AttachFileTypeEnum,
  AttachmentType,
} from '../../redux/types/MessageTypes'
import { getTypeOfAttachment } from '../message_utils/MessageUtils'

export const staticNumberOfAttachmentByType = (
  attachments: AttachmentType[]
): StaticAttachmentByType => {
  let staticResult: StaticAttachmentByType = {
    image: 0,
    file: 0,
  }

  for (let i = 0; i < attachments.length; ++i) {
    if (getTypeOfAttachment(attachments[i]) === AttachFileTypeEnum.IMAGE)
      ++staticResult.image
    else ++staticResult.file
  }

  return staticResult
}

export const filterAttachmentByType = (
  type: AttachFileTypeEnum,
  attachments: AttachmentType[]
): AttachmentType[] => {
  if (attachments.length === 0) return []

  let result: AttachmentType[] = []

  for (let i = 0; i < attachments.length; ++i) {
    if (getTypeOfAttachment(attachments[i]) === type)
      result.push(attachments[i])
  }

  return result
}
