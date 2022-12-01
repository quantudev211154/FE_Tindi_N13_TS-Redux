import { AttachmentType } from './MessageTypes'

export type FileViewerType = {
  isOpen: boolean
  currentAttachment: AttachmentType | undefined
}

export type StaticAttachmentByType = {
  image: number
  file: number
}
