import { Group, LogoutOutlined, Person, Settings } from '@mui/icons-material'
import {
  controlOverlaysActions,
  controlOverlaysState,
} from '../../../../../../redux/slices/ControlOverlaysSlice'
import DropdownItem, {
  IDropdownItemProps,
} from '../../../../../core/DropdownItem'
import ConfirmLogout from '../../../../overlays/ConfirmLogout'
import { useAppSelector } from '../../../../../../redux_hooks'
import Contact from '../../../../overlays/Contact'
import NewGroup from '../../../../overlays/NewGroup'
import { default as SettingOverlay } from './../../../../overlays/Settings'

interface Props {
  open: boolean
}

const Dropdown = ({ open }: Props) => {
  const {
    openConfirmLogoutOverlay,
    openContactOverlay,
    openNewGroupOverlay,
    openSettingOverlay,
  } = useAppSelector(controlOverlaysState)

  const dropdownItemList: IDropdownItemProps[] = [
    {
      key: 1,
      bgIcon: '#e6306a',
      icon: <Person sx={{ width: 23, height: 23 }} />,
      label: 'Danh bạ',
      handleClick: controlOverlaysActions.toggleContactOverlay,
      followState: openContactOverlay,
      backdropContent: <Contact />,
    },
    {
      key: 2,
      bgIcon: '#2780d9',
      icon: <Group sx={{ width: 23, height: 23 }} />,
      label: 'Tạo nhóm',
      handleClick: controlOverlaysActions.toggleNewGroupOverlay,
      followState: openNewGroupOverlay,
      backdropContent: <NewGroup />,
    },
    {
      key: 3,
      bgIcon: '#7f40f5',
      icon: <Settings sx={{ width: 23, height: 23 }} />,
      label: 'Cài đặt',
      handleClick: controlOverlaysActions.toggleSettingOverlay,
      followState: openSettingOverlay,
      backdropContent: <SettingOverlay />,
    },
    {
      key: 4,
      bgIcon: '#f24033',
      icon: <LogoutOutlined sx={{ width: 23, height: 23 }} />,
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
              height: '15rem',
              fontSize: '.9rem',
              boxShadow: '0 .25rem .5rem .125rem rgba(114,114,114,0.25098)',
              visibility: 'visible',
              opacity: '1',
            }
          : {
              width: '0rem',
              height: '0rem',
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
