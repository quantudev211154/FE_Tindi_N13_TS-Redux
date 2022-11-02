import { SettingsOutlined } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
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
import { createNewConversation } from '../../../../../utilities/conversation/ConversationUtils'
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
        createNewConversation(
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
      <div className='flex-initial'>
        {/* <Tooltip title='Xem các tuỳ chọn nâng cao'>
          <Button
            disableElevation
            onClick={() => {
              console.log(123)
            }}
            variant='contained'
            sx={{
              maxWidth: '2.5rem',
              maxHeight: '2.5rem',
              minWidth: '2.5rem',
              minHeight: '2.5rem',
              borderRadius: '50%',
              textTransform: 'none',
              bgcolor: 'transparent',
              mr: 2,
              color: '#363738',
              fontSize: '0.875rem',
              transition: '.2s ease',
              '&:hover': { bgcolor: '#2f6896', color: 'white' },
            }}
          >
            <SettingsOutlined />
          </Button>
        </Tooltip> */}
      </div>
    </div>
  )
}

export default ContactMain
