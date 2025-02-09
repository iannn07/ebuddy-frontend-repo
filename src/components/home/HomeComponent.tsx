import { USER } from '@/types/user'
import { Card, CardContent, CardHeader, Container } from '@mui/material'

interface HomeComponentProps {
  allUsers: USER[] | null
}

function HomeComponent({ allUsers }: HomeComponentProps) {
  return (
    <Container className='flex items-center justify-center min-h-screen'>
      <Card className='p-5 w-full max-w-3xl'>
        <CardHeader title='User List' />
        <CardContent className='flex flex-col md:grid md:grid-cols-3 gap-5 w-full'>
          {allUsers?.map((user) => (
            <div key={user.id}>
              <h1>{user.id}</h1>
              <h1>{user.email}</h1>
              <h1>{user.username}</h1>
              <h1>{user.sales}</h1>
              <h1>{user.purchases}</h1>
              <h1>{user.sector}</h1>
            </div>
          ))}
        </CardContent>
      </Card>
    </Container>
  )
}

export default HomeComponent
