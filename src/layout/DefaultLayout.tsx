import { Container } from '@mui/material'
import React from 'react'

function DefaultLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Container className='min-h-screen w-full'>{children}</Container>
}

export default DefaultLayout
