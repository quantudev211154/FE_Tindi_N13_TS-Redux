import { Checkbox } from '@mui/material'
import { AVATAR_SMALL } from '../../../../../constants/UserAvatarConstant'
import { ContactType } from '../../../../../redux/types/ContactTypes'
import UserAvatar from '../../../../core/UserAvatar'

type Props = {
  isChecked: boolean
  onClick: Function
  contact: ContactType
}

const ContactToAdd = ({ isChecked, onClick, contact }: Props) => {
  return (
    <div
      onClick={() => {
        onClick()
      }}
      className='w-full p-2 rounded-md flex justify-start items-center transition-all hover:bg-slate-300 cursor-pointer'
    >
      <Checkbox
        checked={isChecked}
        onChange={() => {
          onClick()
        }}
      />
      <div className='flex justify-start items-center ml-5'>
        <UserAvatar
          name={contact.fullName}
          avatar={contact.avatar as string}
          size={AVATAR_SMALL}
        />
        <span className='ml-3 pointer-events-none font-medium'>
          {contact.fullName}
        </span>
      </div>
    </div>
  )
}

export default ContactToAdd
