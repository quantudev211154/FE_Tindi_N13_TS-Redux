import { Alert, Collapse, SxProps, Theme } from '@mui/material'

type Props = {
  msg: string | undefined
  sx?: SxProps<Theme> | undefined
}

const FormErrorDisplay = ({ msg, sx }: Props) => {
  return (
    <Collapse in={msg ? true : false} sx={!sx ? { mb: 2 } : sx}>
      <Alert severity='error'>{msg}</Alert>
    </Collapse>
  )
}

export default FormErrorDisplay
