'use server'

import { getAuthCookies } from '@/utils/getAuthCookies'
import { redirect } from 'next/navigation'
import { ebuddyBEClient } from '../api'

async function getEbuddyUser(id?: string) {
  try {
    const currentUserToken = await getAuthCookies()

    if (!currentUserToken) redirect('/auth/login')

    const response = await ebuddyBEClient.get(
      id ? `/fetch-user-data/${id}` : 'fetch-all-user-data',
      {
        data: {
          token: currentUserToken.value,
        },
      }
    )

    if (response.status !== 200) {
      console.log('Failed to fetch user data')

      return { data: null, error: response }
    }

    return { data: response.data.data, error: null }
  } catch (error) {
    console.error('An error occurred while fetching user:', error)

    return { data: null, error }
  }
}

export const getAllEbuddyUsers = async () => {
  return getEbuddyUser()
}

export const getSingleEbuddyUser = async (id: string) => {
  return getEbuddyUser(id)
}
