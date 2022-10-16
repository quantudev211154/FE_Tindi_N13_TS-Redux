import { Box, Button, Modal } from '@mui/material'
import { ReactNode } from 'react'
import { useAppDispatch } from '../../redux_hooks'

export type IDropdownItemProps = {
  key: number
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
  item: { icon, label, handleClick, followState, backdropContent },
}: Props) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Button
        variant='contained'
        fullWidth={true}
        startIcon={icon}
        sx={{
          width: '100%',
          py: 1,
          bgcolor: 'transparent',
          color: 'black',
          fontWeight: 'medium',
          textTransform: 'none',
          justifyContent: 'flex-start',
          fontSize: '1em',
          '& svg': {
            fill: '#707579',
          },
          '&:hover': {
            bgcolor: 'rgb(228,228,229)',
          },
        }}
        disableElevation
        onClick={() => {
          dispatch(handleClick())
          // console.log(123)
        }}
      >
        <span className='ml-2'>{label}</span>
      </Button>
      <Modal
        open={followState}
        onClose={() => {
          dispatch(handleClick())
        }}
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            boxShadow: 24,
            borderRadius: '.8rem',
          }}
        >
          {backdropContent}
        </Box>
      </Modal>
    </>
  )
}

export default DropdownItem
