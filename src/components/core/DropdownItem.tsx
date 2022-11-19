import { Box, Button, Modal } from '@mui/material'
import { ReactNode } from 'react'
import { useAppDispatch } from '../../redux_hooks'

export type IDropdownItemProps = {
  key: number
  bgIcon: string
  icon: ReactNode
  label: string
  handleClick: Function
  followState: boolean
  backdropContent: ReactNode
}

type Props = {
  item: IDropdownItemProps
}

const DropdownItem = ({
  item: { bgIcon, icon, label, handleClick, followState, backdropContent },
}: Props) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Button
        variant='contained'
        fullWidth={true}
        sx={{
          width: '100%',
          py: 1,
          bgcolor: 'transparent',
          fontWeight: 'medium',
          color: 'black',
          textTransform: 'none',
          justifyContent: 'flex-start',
          fontSize: '1em',
          '&:hover': {
            bgcolor: 'rgb(228,228,229)',
          },
        }}
        disableElevation
        onClick={() => {
          dispatch(handleClick())
        }}
      >
        <label
          style={{ backgroundColor: bgIcon }}
          className='p-1 rounded-md text-white'
        >
          {icon}
        </label>
        <span className='ml-5'>{label}</span>
      </Button>
      <Modal
        open={followState}
        onClose={() => {
          dispatch(handleClick())
        }}
      >
        <div className='w-5/6 md:w-1/3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg'>
          {backdropContent}
        </div>
      </Modal>
    </>
  )
}

export default DropdownItem
