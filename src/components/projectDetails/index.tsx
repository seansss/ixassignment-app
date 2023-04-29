import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppDispatch } from '../../store/hooks';
import React, { useEffect  } from 'react'
import { getProject } from '../../store/slices/project/reducer';
import { Project } from '../../store/common/types';
import UserTable from './userTable';
import FileTable from './fileTable';
import { useNavigate } from 'react-router'

export interface ProjectDetailProps {
    projectId: string
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function ProjectDetails({projectId}: ProjectDetailProps) {
    const navigate = useNavigate()
    const rtDispatch = useAppDispatch()

    const [value, setValue] = React.useState(0)
    const [project, setProject] = React.useState<Project | undefined>()

    useEffect(() => {
        if (projectId) {
          rtDispatch(
            getProject({
              callback: projectLoaded,
              projectId: projectId,
            }),
          )
        }
    });

    const projectLoaded = (project: Project | undefined) => {
        if (project) {
            setProject(project);
        }
        else { 
          // redirect back to main page
          navigate(`/`)
        }
    }
    

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };

    return(
        <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Files" {...a11yProps(1)} />
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            {project && project.users && <UserTable users={project.users} />}
        </TabPanel>
        <TabPanel value={value} index={1}>
            {project && project.files && <FileTable files={project.files} />}
        </TabPanel>
        </>
    )
}
