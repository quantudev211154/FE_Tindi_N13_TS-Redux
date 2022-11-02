import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { AppDispatch } from '../../redux_store'

export const calContextMenuPos = (
  pageX: number,
  pageY: number,
  setCurrentCoordinate: ActionCreatorWithPayload<
    [number, number, boolean, boolean],
    string
  >,
  dispatch: AppDispatch
): void => {
  const safeHeight = Math.ceil((window.innerHeight / 5) * 3)
  const safeWidth = Math.ceil((window.innerWidth / 5) * 4)

  if (pageX > safeWidth && pageY > safeHeight)
    dispatch(setCurrentCoordinate([pageX, pageY, true, true]))
  else if (pageX > safeWidth && pageY < safeHeight)
    dispatch(setCurrentCoordinate([pageX, pageY, false, true]))
  else if (pageX < safeWidth && pageY > safeHeight)
    dispatch(setCurrentCoordinate([pageX, pageY, true, false]))
  else if (pageX < safeWidth && pageY < safeHeight)
    dispatch(setCurrentCoordinate([pageX, pageY, false, false]))
}

export const calTransformStyleForContextMenu = (
  isOverflowScreenHeight: boolean,
  isOverflowScreenWidth: boolean
): string => {
  let transform = 'translate'

  if (isOverflowScreenWidth && isOverflowScreenHeight)
    transform += '(-100%, -100%)'
  else if (isOverflowScreenWidth && !isOverflowScreenHeight)
    transform += '(-100%, 0)'
  else if (!isOverflowScreenWidth && isOverflowScreenHeight)
    transform += '(0%, -100%)'
  else if (!isOverflowScreenWidth && !isOverflowScreenHeight)
    transform += '(0, 0)'
  return transform
}
