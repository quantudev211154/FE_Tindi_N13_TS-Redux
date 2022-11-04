import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit'
import { MessageContextItemHandlerResult } from '../../redux/types/MessageContextmenuTypes'
import { AppDispatch } from '../../redux_store'

export const showMessageHandlerResultToSnackbar = (
  status: boolean | undefined,
  msg: string,
  dispatch: AppDispatch,
  setHandlerResult: ActionCreatorWithOptionalPayload<
    MessageContextItemHandlerResult | undefined,
    string
  >
) => {
  if (status === undefined) {
    dispatch(setHandlerResult(undefined))
    return
  }

  const result: MessageContextItemHandlerResult = {
    status,
    msg,
  }
  dispatch(setHandlerResult(result))
}
