import { Menu } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'
import Dropdown from './dropdown/Dropdown'

const DropdownMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown)
  }

  const hideDropdown = () => {
    setOpenDropdown(false)
  }

  return (
    <div className='relative pr-3'>
      <Button
        variant='contained'
        sx={{
          maxWidth: '2.5rem',
          maxHeight: '2.5rem',
          minWidth: '2.5rem',
          minHeight: '2.5rem',
          borderRadius: '50%',
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: '#eeeee4',
          },
        }}
        disableElevation
        onClick={toggleDropdown}
        onBlur={hideDropdown}
      >
        <Menu sx={{ fill: 'black' }} />
      </Button>
      <Dropdown open={openDropdown} />
    </div>
  )
}

export default DropdownMenu
