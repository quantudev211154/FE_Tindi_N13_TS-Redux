import { useEffect, useState } from 'react'
import { SocketEventEnum } from '../../../../../../constants/SocketConstant'
import { authState } from '../../../../../../redux/slices/AuthSlice'
import { conversationsControlState } from '../../../../../../redux/slices/ConversationsControlSlice'
import {
  ConversationType,
  ConversationTypeEnum,
} from '../../../../../../redux/types/ConversationTypes'
import { UserType } from '../../../../../../redux/types/UserTypes'
import { useAppSelector } from '../../../../../../redux_hooks'
import { MySocket } from '../../../../../../services/TindiSocket'
import { getTeammateInSingleConversation } from '../../../../../../utilities/conversation/ConversationUtils'
import UserAvatar from '../../../../../core/UserAvatar'
import { AVATAR_SMALL } from './../../../../../../constants/UserAvatarConstant'

type Props = {}

const ChatHeaderLeft = (props: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { currentChat } = useAppSelector(conversationsControlState)
  const [targetUser, setTargetUser] = useState<UserType | undefined>(undefined)
  const [typingState, setTypingState] = useState('')

  useEffect(() => {
    if (currentChat) {
      setTargetUser(
        getTeammateInSingleConversation(
          currentUser as UserType,
          currentChat as ConversationType
        ).user
      )

      MySocket.getTindiSocket()?.on(
        SocketEventEnum.CHANGE_TYPING_STATE,
        (data: any) => {
          const { conversationId, currentUserId, targetUserId, isTyping } = data

          if (conversationId === (currentChat as ConversationType).id) {
            if (isTyping) {
              targetUserId === currentUser?.id
                ? setTypingState(
                    currentUser?.fullName + ' đang soạn tin nhắn...'
                  )
                : setTypingState('')
            } else {
              setTypingState(' ')
            }
          }
        }
      )
    }
  }, [currentChat])

  return (
    <div className='flex flex-row justify-start items-center whitespace-nowrap overflow-hidden text-ellipsis break-all'>
      <UserAvatar
        name={
          currentChat?.type === ConversationTypeEnum.GROUP
            ? (currentChat?.title as string)
            : (targetUser?.fullName as string)
        }
        avatar={
          currentChat?.type === ConversationTypeEnum.GROUP
            ? (currentChat?.avatar as string)
            : (targetUser?.avatar as string)
        }
        size={AVATAR_SMALL}
      />
      <div className='flex flex-col justify-start ml-3'>
        <span className='font-semibold transition-all'>
          {currentChat?.type === ConversationTypeEnum.GROUP
            ? (currentChat.title as string)
            : (targetUser?.fullName as string)}
        </span>
        <span className='text-[13px] text-gray-600 transition-all'>
          {typingState}
        </span>
      </div>
    </div>
  )
}

export default ChatHeaderLeft
