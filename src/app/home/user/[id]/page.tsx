interface UserDetailPageProps {
  searchParams: {
    id: string
  }
}

function UserDetailPage({ searchParams }: UserDetailPageProps) {
  const { id } = searchParams

  console.log('id', id)

  return <div>UserDetailPage</div>
}

export default UserDetailPage
