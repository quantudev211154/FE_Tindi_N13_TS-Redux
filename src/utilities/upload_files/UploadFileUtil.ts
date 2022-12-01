export const acceptImageType = (): string => {
  const imageTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/webp']

  return imageTypes.join(', ')
}

export const acceptFileType = (): string => {
  const fileTypes = [
    '.xlsx',
    '.xls',
    '.doc',
    '.docx',
    '.ppt',
    '.pptx',
    '.txt',
    '.pdf',
    '.mp4',
    '.mp3',
    '.flac',
    '.avi',
    '.WMV',
  ]

  return fileTypes.join(', ')
}

export const canUploadFiles = (
  uploadFiles: FileList,
  maxSize: number = 25
): boolean => {
  let totalSize = 0

  for (let i = 0; i < uploadFiles.length; ++i) {
    // if (uploadFiles[i].size > maxSize) return false

    totalSize += uploadFiles[i].size / (1024 * 1024)

    // if (totalSize > maxSize) return false
  }

  console.log(totalSize)

  return totalSize <= maxSize ? true : false
}
