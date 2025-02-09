import UserDetailComponent from '@/components/home/user-details/UserDetailComponent'
import { fetchSingleUserAction } from './utils/fetchSingleUserAction'

interface UserDetailPageProps {
  params: {
    id: string
  }
}

async function UserDetailPage({ params }: UserDetailPageProps) {
  const resolvedParams = await Promise.resolve(params)
  const user = await fetchSingleUserAction(resolvedParams.id)

  return <UserDetailComponent user={user.data} />
}

export default UserDetailPage
