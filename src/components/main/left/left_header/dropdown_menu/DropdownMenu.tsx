import { Menu } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'
import Dropdown from './dropdown/Dropdown'

const DropdownMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const toggleDropdown = () => {
    setOpenDropdown(true)
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
      >
        <Menu sx={{ fill: 'black' }} />
      </Button>
      <div
        onClick={hideDropdown}
        style={
          openDropdown
            ? {
                opacity: 1,
                visibility: 'visible',
              }
            : {
                opacity: 0,
                visibility: 'hidden',
              }
        }
        className='backdrop fixed top-0 left-0 z-[100] w-full h-full transition-all'
      >
        <Dropdown open={openDropdown} />
      </div>
    </div>
  )
}

export default DropdownMenu
