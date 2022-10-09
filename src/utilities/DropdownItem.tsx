import { Button } from '@mui/material'
import { ReactNode } from 'react'

export type IDropdownItemProps = {
  icon: ReactNode
  label: string
  handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

type Props = {
  item: IDropdownItemProps
}

const DropdownItem = ({ item: { icon, label, handleClick } }: Props) => {
  return (
    <Button
      variant='contained'
      fullWidth={true}
      startIcon={icon}
      sx={{
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
      onClick={handleClick}
    >
      <span className='ml-2'>{label}</span>
    </Button>
  )
}

export default DropdownItem
