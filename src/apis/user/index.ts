'use server'

import { getAuthCookies } from '@/utils/getAuthCookies'
import { redirect } from 'next/navigation'
import { ebuddyBEClient } from '../api'

export const getAllEbuddyUsers = async () => {
  try {
    const currentUserToken = await getAuthCookies()

    if (!currentUserToken) redirect('/auth/login')

    const response = await ebuddyBEClient.get('/fetch-all-user-data', {
      data: {
        token: currentUserToken.value,
      },
    })

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
