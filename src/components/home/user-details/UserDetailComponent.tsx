import { USER } from '@/types/user'

interface UserDetailComponentProps {
  user: USER | null
}

function UserDetailComponent({ user }: UserDetailComponentProps) {
  return <div>{user?.email}</div>
}

export default UserDetailComponent
