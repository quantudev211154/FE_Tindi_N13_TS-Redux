import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { messageContextmenuActions } from '../../../../../../../redux/slices/MessageContextmenuSlice'
import { MessageContextItemHandlerResult } from '../../../../../../../redux/types/MessageContextmenuTypes'
import { MessageType } from '../../../../../../../redux/types/MessageTypes'
import { useAppDispatch } from '../../../../../../../redux_hooks'
import { AppDispatch } from '../../../../../../../redux_store'

export type MessageHandlerType = (
  arg1: MessageType,
  arg2?: ActionCreatorWithPayload<any, string>,
  arg3?: AppDispatch
) => MessageContextItemHandlerResult

type Props = {
  icon: ReactNode
  label: string
  message: MessageType
  additionHandler?: ActionCreatorWithPayload<any, string>
  handler: MessageHandlerType
  warning?: boolean
}

const MessageContextMenuItem = ({
  icon,
  label,
  message,
  handler,
  additionHandler,
  warning,
}: Props) => {
  const { setHandlerResult } = messageContextmenuActions
  const dispatch = useAppDispatch()

  return (
    <div
      className='cursor-pointer px-2 py-2 flex justify-start bg-transparent items-center text-sm rounded-md transition-all hover:bg-[rgba(220,220,220,0.733333)]'
      onClick={() => {
        const handlerResult =
          additionHandler !== undefined
            ? handler(message, additionHandler, dispatch)
            : handler(message)

        dispatch(setHandlerResult(handlerResult))
      }}
    >
      <figure>{icon}</figure>
      {warning ? (
        <span className='ml-5 text-red-700 font-medium'>{label}</span>
      ) : (
        <span className='ml-5 font-medium'>{label}</span>
      )}
    </div>
  )
}

export default MessageContextMenuItem
