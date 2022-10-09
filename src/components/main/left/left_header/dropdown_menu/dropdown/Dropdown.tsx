import {
  GroupOutlined,
  LogoutOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { nanoid } from '@reduxjs/toolkit'
import DropdownItem, {
  IDropdownItemProps,
} from '../../../../../../utilities/DropdownItem'
import {
  handleClickOnContactBtn,
  handleClickOnLogoutBtn,
  handleClickOnNewGroupBtn,
  handleClickOnSettingBtn,
} from './DropdownItemHandleClick'

interface Props {
  open: boolean
}

const dropdownItemList: IDropdownItemProps[] = [
  {
    icon: <PersonOutlineOutlined />,
    label: 'Danh bạ',
    handleClick: handleClickOnContactBtn,
  },
  {
    icon: <GroupOutlined />,
    label: 'Tạo nhóm',
    handleClick: handleClickOnNewGroupBtn,
  },
  {
    icon: <SettingsOutlined />,
    label: 'Cài đặt',
    handleClick: handleClickOnSettingBtn,
  },
  {
    icon: <LogoutOutlined />,
    label: 'Đăng xuất',
    handleClick: handleClickOnLogoutBtn,
  },
]

const Dropdown = ({ open }: Props) => {
  return (
    <div
      style={
        open
          ? {
              visibility: 'visible',
              opacity: '1',
              width: '17rem',
              height: '13rem',
              fontSize: '.9rem',
            }
          : {
              visibility: 'hidden',
              opacity: '0',
              width: '0rem',
              height: '0rem',
              fontSize: '0rem',
            }
      }
      className='absolute max-h-[calc(100*var(--vh) - 3.75rem)] flex flex-col justify-start z-50 left-0 top-full mt-2 p-1 
      rounded-lg bg-[rgba(255,255,255,0.733333)] backdrop-blur-[5px] shadow-lg transition-all duration-200'
    >
      {dropdownItemList.map((item) => (
        <div key={nanoid()} className='w-full'>
          <DropdownItem item={item} />
        </div>
      ))}
      <div className='w-full text-center pt-3'>
        <span className='font-normal text-[.8rem] text-gray-500'>
          Tindi Web 1.0
        </span>
      </div>
    </div>
  )
}

export default Dropdown
