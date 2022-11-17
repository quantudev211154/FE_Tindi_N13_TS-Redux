import React from 'react'
import { controlOverlaysActions } from '../../../redux/slices/ControlOverlaysSlice'
import { useAppDispatch } from '../../../redux_hooks'

type Props = {}

const Settings = (props: Props) => {
  const { toggleSettingOverlay } = controlOverlaysActions
  const dispatch = useAppDispatch()

  return (
    <div className='w-full bg-white rounded-md'>
      <div></div>
    </div>
  )
}

export default Settings
