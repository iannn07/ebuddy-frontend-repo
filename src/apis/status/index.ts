'use server'

import { ebuddyBEClient } from '../api'

export async function checkEbuddyBEStatus() {
  const status = await ebuddyBEClient.get('/')

  if (status.status !== 200) {
    console.log('EBuddy Backend is down')

    return {
      success: false,
      error: status.data.message,
    }
  }

  console.log({ status: status.data })

  return {
    success: true,
    data: status.data,
  }
}
