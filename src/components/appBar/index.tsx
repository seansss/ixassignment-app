import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router'
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';


export default function ButtonAppBar() {
    const pages = ['Products', 'Pricing', 'Blog'];
    const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton size="large" title='Projects' color="inherit" onClick={() => { 
          navigate('/');
        }}>
            <HomeIcon />
        </IconButton>          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => { 
            navigate('/');
          }}>
            Projects
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
