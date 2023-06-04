import { ReactNode } from 'react'
import { Container } from '@mui/material'

export interface ContentWrapperProps {
  children?: ReactNode
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return <Container maxWidth='lg'>{children}</Container>
}

export default ContentWrapper
