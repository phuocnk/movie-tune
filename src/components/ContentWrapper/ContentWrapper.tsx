import { ReactNode } from 'react'
import { Container } from '@mui/material'
import ErrorBoundary from '../ErrorBoundary'

export interface ContentWrapperProps {
  children?: ReactNode
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <Container maxWidth='lg' sx={{ marginTop: 12 }}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Container>
  )
}

export default ContentWrapper
