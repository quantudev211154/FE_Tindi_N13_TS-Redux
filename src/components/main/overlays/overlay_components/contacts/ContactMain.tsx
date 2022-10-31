import { SettingsOutlined } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import axios from 'axios'
import { API_GET_USER_BY_PHONE } from '../../../../../constants/APIConstant'
import { AVATAR_SMALL } from '../../../../../constants/UserAvatarConstant'
import { authState } from '../../../../../redux/slices/AuthSlice'
import { controlOverlaysActions } from '../../../../../redux/slices/ControlOverlaysSlice'
import {
  conversationActions,
  conversationsControlState,
} from '../../../../../redux/slices/ConversationsControlSlice'
import { addNewConversation } from '../../../../../redux/thunks/ConversationThunks'
import { ContactType } from '../../../../../redux/types/ContactTypes'
import {
  AddNewConversationPayloadType,
  ConversationType,
  ConversationTypeEnum,
} from '../../../../../redux/types/ConversationTypes'
import { UserType } from '../../../../../redux/types/UserTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux_hooks'
import { randomBgrColorForAvatar } from '../../../../../utilities/user_avatar/creatingAvatarProps'
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

  const checkExistingSingleConversation = (
    userId1: number,
    userId2: number
  ): ConversationType | null => {
    for (const item of conversationList) {
      if (item.type === ConversationTypeEnum.SINGLE) {
        const participantResponse = item.participantResponse

        const usersIdToString: string =
          participantResponse[0].user.id + '-' + participantResponse[1].user.id

        if (
          usersIdToString.includes(userId1.toString()) &&
          usersIdToString.includes(userId2.toString())
        )
          return item
      } else continue
    }

    return null
  }

  const createNewConversation = async () => {
    const response = await axios.get(API_GET_USER_BY_PHONE + contact.phone)

    const existingConver = checkExistingSingleConversation(
      currentUser?.id as number,
      (response.data as UserType).id
    )

    if (existingConver != null) {
      dispatch(changeCurrentChat(existingConver))
    } else {
      try {
        const payload: AddNewConversationPayloadType = {
          title: contact.fullName,
          avatar: randomBgrColorForAvatar(),
          user: currentUser as UserType,
          usersId: [currentUser?.id as number, (response.data as UserType).id],
        }
        dispatch(addNewConversation(payload))
      } catch (error) {}
    }

    dispatch(toggleContactOverlay())
  }

  return (
    <div
      onClick={createNewConversation}
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
        <Tooltip title='Xem các tuỳ chọn nâng cao'>
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
        </Tooltip>
      </div>
    </div>
  )
}

export default ContactMain
