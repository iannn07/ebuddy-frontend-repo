'use server'

import { ebuddyBEClient } from '@/apis/api'
import { checkEbuddyBEStatus } from '@/apis/status'
import { cookies } from 'next/headers'

export const validateToken = async (token: string) => {
  try {
    const { success: status, error: statusError } = await checkEbuddyBEStatus()

    if (!status) {
      console.log('EBuddy Backend is down')

      return {
        success: false,
        error: statusError,
      }
    }

    const response = await ebuddyBEClient.post('/auth/login', {
      token,
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
      },
    })

    if (response.status !== 200) {
      console.log('Token validation in EBuddy Backend failed')

      return {
        success: false,
        error: response.data.message,
      }
    }

    console.log('Token validated successfully')

    const cookieStore = await cookies()
    cookieStore.set('fb-principal-iris-token', response.data.token)

    console.log('Token stored in cookie')

    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    console.error('An error occurred while validating token:', error)

    return {
      success: false,
      error,
    }
  }
}
