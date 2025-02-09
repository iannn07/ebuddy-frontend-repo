import { USER } from '@/types/user'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from '@mui/material'
import Link from 'next/link'

interface UserCardComponentProps {
  user: USER
}

const renderUserData = (user: USER) => {
  return (
    <Box className='grid grid-cols-2 text-left'>
      <Box className='hidden md:block'>
        <Typography variant='body1'>Email</Typography>
        <Typography variant='body1'>Purchases</Typography>
        <Typography variant='body1'>Balance</Typography>
      </Box>
      <Box>
        <Typography variant='body1'>{user.email}</Typography>
        <Typography variant='body1'>{user.purchases}</Typography>
        <Typography variant='body1'>{user.balance}</Typography>
      </Box>
    </Box>
  )
}

function UserCardComponent({ user }: UserCardComponentProps) {
  return (
    <Link href={`/home/user/${user.id}`}>
      <Card className='p-4 w-full rounded-xl border border-primary hover:shadow-xl hover:scale-105 transition-all ease-in-out text-center cursor-pointer active:scale-100'>
        <CardHeader className='text-lg font-bold' title={user.username} />
        <CardContent className='w-full'>
          {renderUserData(user)}
          <Box className='flex flex-wrap justify-center gap-2 mt-4'>
            {user.sector.map((sec, index) => (
              <Chip
                key={index}
                label={sec}
                variant='outlined'
                className='border border-primary'
                color='primary'
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

export default UserCardComponent
