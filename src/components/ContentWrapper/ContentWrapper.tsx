import { ReactNode } from 'react'
import { Container } from '@mui/material'

export interface ContentWrapperProps {
  children?: ReactNode
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <Container maxWidth='lg' sx={{ marginTop: 12 }}>
      {children}
    </Container>
  )
}

export default ContentWrapper
