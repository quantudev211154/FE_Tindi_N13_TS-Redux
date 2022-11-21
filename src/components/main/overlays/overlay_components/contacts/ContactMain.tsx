import { AVATAR_SMALL } from '../../../../../constants/UserAvatarConstant'
import { authState } from '../../../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../../../redux/slices/ControlOverlaysSlice'
import {
  conversationActions,
  conversationsControlState,
} from '../../../../../redux/slices/ConversationsControlSlice'
import { ContactType } from '../../../../../redux/types/ContactTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { createNewSingleConversation } from '../../../../../utilities/conversation/ConversationUtils'
import UserAvatar from '../../../../core/UserAvatar'

type Props = {
  contact: ContactType
}

const ContactMain = ({ contact }: Props) => {
  const { currentUser } = useAppSelector(authState)
  const { conversationList } = useAppSelector(conversationsControlState)
  const { changeCurrentChat } = conversationActions
  const { toggleContactOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => {
        createNewSingleConversation(
          currentUser as UserType,
          contact,
          conversationList,
          dispatch,
          changeCurrentChat,
          toggleContactOverlay
        )
      }}
      key={contact.id}
      className='cursor-pointer p-3 flex justify-between items-center rounded-xl transition-all hover:bg-[#bcd1e3]'
    >
      <div className='flex-auto flex justify-start items-center'>
        <UserAvatar
          name={contact.fullName}
          avatar={contact.avatar as string}
          size={AVATAR_SMALL}
        />
        <span className='ml-5 pointer-events-none font-medium'>
          {contact.fullName}
        </span>
      </div>
      <div className='flex-initial'></div>
    </div>
  )
}

export default ContactMain
