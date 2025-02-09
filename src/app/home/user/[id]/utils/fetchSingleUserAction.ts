'use server'

import { getSingleEbuddyUser } from '@/apis/user'
import { USER } from '@/types/user'

export async function fetchSingleUserAction(id: string) {
  try {
    const { data, error } = await getSingleEbuddyUser(id)

    if (!data || error) {
      console.log('Failed to fetch user data')

      return { data: null, error }
    }

    return { data: data as USER, error }
  } catch (error) {
    console.error(`An error occurred while fetching user with ID ${id}:`, error)

    return { data: null, error }
  }
}
