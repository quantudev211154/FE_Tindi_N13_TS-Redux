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
