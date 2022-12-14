import {
  AVATAR_SMALL,
  AVATAR_SMALL_IMG_SIZE,
  AVATAR_SMALL_TEXT_SIZE,
  AVATAR_LARGE,
  AVATAR_LARGE_IMG_SIZE,
  AVATAR_LARGE_TEXT_SIZE,
  AVATAR_BASE_IMG_SIZE,
  AVATAR_BASE_TEXT_SIZE,
  AVATAR_MINI,
  AVATAR_MINI_IMG_SIZE,
  AVATAR_MINI_TEXT_SIZE,
  AVATAR_HUGE,
  AVATAR_HUGE_IMG_SIZE,
  AVATAR_HUGE_TEXT_SIZE,
} from './../../constants/UserAvatarConstant'

type ReturnType = {
  width: number
  height: number
  fontSize: number
}

const calculatingUserAvatar = (size: string): ReturnType => {
  if (size === AVATAR_SMALL) {
    return {
      width: AVATAR_SMALL_IMG_SIZE,
      height: AVATAR_SMALL_IMG_SIZE,
      fontSize: AVATAR_SMALL_TEXT_SIZE,
    }
  } else if (size === AVATAR_LARGE) {
    return {
      width: AVATAR_LARGE_IMG_SIZE,
      height: AVATAR_LARGE_IMG_SIZE,
      fontSize: AVATAR_LARGE_TEXT_SIZE,
    }
  } else if (size === AVATAR_MINI) {
    return {
      width: AVATAR_MINI_IMG_SIZE,
      height: AVATAR_MINI_IMG_SIZE,
      fontSize: AVATAR_MINI_TEXT_SIZE,
    }
  } else if (size === AVATAR_HUGE) {
    return {
      width: AVATAR_HUGE_IMG_SIZE,
      height: AVATAR_HUGE_IMG_SIZE,
      fontSize: AVATAR_HUGE_TEXT_SIZE,
    }
  }

  return {
    width: AVATAR_BASE_IMG_SIZE,
    height: AVATAR_BASE_IMG_SIZE,
    fontSize: AVATAR_BASE_TEXT_SIZE,
  }
}

export default calculatingUserAvatar
