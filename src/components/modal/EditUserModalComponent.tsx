import { USER } from '@/types/user'
import { Close } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

interface EditUserModalComponentProps {
  open: boolean
  handleClose: () => void
  user: USER
}

function EditUserModalComponent({
  open,
  handleClose,
  user,
}: EditUserModalComponentProps) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle className='flex justify-between items-center pb-4'>
        <Typography variant={isSmallScreen ? 'h5' : 'h4'}>
          Edit User Data
        </Typography>
        <IconButton onClick={handleClose} color='primary'>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant='body1'>
          Are you sure you want to delete user {user.username}?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='secondary' variant='outlined'>
          Cancel
        </Button>
        <Button onClick={handleClose} color='primary' variant='contained'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditUserModalComponent
