import { Helmet } from 'react-helmet-async'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import { RouteIdParams } from '../../routes/paths'
import ButtonAppBar from '../../components/appBar'
import ProjectDetails from '../../components/projectDetails'
export default function ProjectDetailsPage() {

  const { projectId } = useParams<RouteIdParams>()

  return (
    <>
      <Helmet>
        <title>Project Details</title>
      </Helmet>
      <ButtonAppBar />
      <Container className='page-container' maxWidth={false}>
        <ProjectDetails projectId={projectId!} />
      </Container>
    </>
  )
}
  
