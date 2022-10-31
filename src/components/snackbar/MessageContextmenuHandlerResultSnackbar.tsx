import { Alert, Collapse, Snackbar } from '@mui/material'
import {
  messageContextmenuActions,
  messageContextmenuState,
} from '../../redux/slices/MessageContextmenuSlice'
import { useAppDispatch, useAppSelector } from '../../redux_hooks'

const MessageContextmenuHandlerResultSnackbar = () => {
  const { handlerResult } = useAppSelector(messageContextmenuState)
  const dispatch = useAppDispatch()
  const { setHandlerResult } = messageContextmenuActions

  return (
    <Snackbar
      open={handlerResult !== undefined ? true : false}
      onClose={() => {
        const t = window.setTimeout(() => {
          dispatch(setHandlerResult(undefined))
          window.clearTimeout(t)
        }, 5000)
      }}
      autoHideDuration={5000}
    >
      <Collapse in={handlerResult !== undefined ? true : false}>
        <Alert
          severity={handlerResult?.status ? 'success' : 'error'}
          sx={{
            width: '100%',
            // bgcolor: handlerResult?.status ? '#4e9a51' : '#d84646',
          }}
        >
          {handlerResult?.msg}
        </Alert>
      </Collapse>
    </Snackbar>
  )
}

export default MessageContextmenuHandlerResultSnackbar
