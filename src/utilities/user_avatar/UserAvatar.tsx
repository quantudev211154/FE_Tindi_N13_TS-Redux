import { Avatar, Tooltip } from '@mui/material'
import calculatingUserAvatar from './calculatingUserAvatar'
import {
  creatingAvatarName,
  randomBgrColorForAvatar,
} from './creatingAvatarProps'

type Props = {
  name: string
  avatar: string | null
  size: string
}

const UserAvatar = ({ name, avatar, size }: Props) => {
  const { width, height, fontSize } = calculatingUserAvatar(size)

  return (
    <Tooltip title={name} placement='bottom'>
      {avatar ? (
        <Avatar
          src={avatar}
          sx={{
            width,
            height,
            fontSize,
            cursor: 'pointer',
            flexShrink: 0,
            zIndex: 20,
          }}
        />
      ) : (
        <Avatar
          {...creatingAvatarName(name)}
          sx={{
            width,
            height,
            fontSize,
            bgcolor: randomBgrColorForAvatar(),
            cursor: 'pointer',
            flexShrink: 0,
            zIndex: 20,
          }}
        />
      )}
    </Tooltip>
  )
}

export default UserAvatar
