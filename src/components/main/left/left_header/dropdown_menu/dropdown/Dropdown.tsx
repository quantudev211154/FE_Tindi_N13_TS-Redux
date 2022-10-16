import {
  GroupOutlined,
  LogoutOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import {
  controlOverlaysActions,
  controlOverlaysState,
} from '../../../../../../redux/slices/ControlOverlaysSlice'
import DropdownItem, {
  IDropdownItemProps,
} from '../../../../../core/DropdownItem'
import ConfirmLogout from '../../../../overlays/ConfirmLogout'
import { useAppSelector } from '../../../../../../redux_hooks'

interface Props {
  open: boolean
}

const Dropdown = ({ open }: Props) => {
  const { openConfirmLogoutOverlay } = useAppSelector(controlOverlaysState)

  const dropdownItemList: IDropdownItemProps[] = [
    // {
    //   key: 1,
    //   icon: <PersonOutlineOutlined />,
    //   label: 'Danh bạ',
    //   handleClick: controlOverlaysActions.toggleConfirmLogoutOverlay,
    //   followState: openConfirmLogoutOverlay,
    //   backdropContent: <ConfirmLogout />,
    // },
    // {
    //   key: 2,
    //   icon: <GroupOutlined />,
    //   label: 'Tạo nhóm',
    //   handleClick: controlOverlaysActions.toggleConfirmLogoutOverlay,
    //   followState: openConfirmLogoutOverlay,
    //   backdropContent: <ConfirmLogout />,
    // },
    // {
    //   key: 3,
    //   icon: <SettingsOutlined />,
    //   label: 'Cài đặt',
    //   handleClick: controlOverlaysActions.toggleConfirmLogoutOverlay,
    //   followState: openConfirmLogoutOverlay,
    //   backdropContent: <ConfirmLogout />,
    // },
    {
      key: 4,
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      handleClick: controlOverlaysActions.toggleConfirmLogoutOverlay,
      followState: openConfirmLogoutOverlay,
      backdropContent: <ConfirmLogout />,
    },
  ]

  return (
    <div
      style={
        open
          ? {
              width: '17rem',
              height: '13rem',
              fontSize: '.9rem',
              boxShadow: '0 .25rem .5rem .125rem rgba(114,114,114,0.25098)',
              visibility: 'visible',
              opacity: '1',
            }
          : {
              width: '0',
              height: '0',
              fontSize: '0rem',
              visibility: 'hidden',
              opacity: '0',
            }
      }
      className='absolute top-[2.5rem] left-[1.5rem] max-h-[calc(100*1.71px - 3.75rem)] flex flex-col justify-start z-[200] mt-2 p-1
      rounded-lg bg-[rgba(255,255,255,0.733333)] backdrop-blur-[5px] transition-all duration-200'
    >
      {dropdownItemList.map((item) => (
        <DropdownItem key={item.key} item={item} />
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
