type ReturnType = {
  children: String
}

export const creatingAvatarName = (name: string): ReturnType => {
  let hashedName = name.split(' ')

  return {
    children: `${hashedName[0][0]}${hashedName[hashedName.length - 1][0]}`,
  }
}

export const randomBgrColorForAvatar = (): string =>
  '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
