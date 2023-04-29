import { useRoutes } from 'react-router-dom'
import ProjectPage from '../pages/projects'
import ProjectDetailsPage from '../pages/project'

export default function Router() { 
    return useRoutes([
        {
            path: 'project/:projectId',
            element: (<ProjectDetailsPage />)
        },
        {
            path: '',
            element: (<ProjectPage />)
        }
    ])
}
