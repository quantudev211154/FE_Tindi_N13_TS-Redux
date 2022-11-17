type ReturnType = {
  children: String
}

export const creatingAvatarName = (name: string): ReturnType => {
  let hashedName = name.split(' ')

  return {
    children: `${hashedName[0][0]}${hashedName[hashedName.length - 1][0]}`,
  }
}
