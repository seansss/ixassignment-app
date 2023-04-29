import { Helmet } from 'react-helmet-async'
import { Container } from '@mui/material'
import ProjectTableWithReactQueryProvider from '../../components/projectList'
export default function ProjectPage() {
  return (
    <>
      <Helmet>
        <title>Projects</title>
      </Helmet>
      <Container className='page-container' maxWidth={false}>
        <ProjectTableWithReactQueryProvider />
      </Container>
    </>
  )
}
  
