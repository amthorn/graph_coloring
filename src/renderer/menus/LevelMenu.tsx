import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ListItemLink } from "../ListItemLink";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const levels = 150;

export const LevelMenu = () => (
  <Box sx={{ width: 1 }}>
    <Paper elevation={0}>
      <List>
        <ListItemLink to="/main_menu" primary="Back" icon={ <ArrowBackIosNewIcon /> }/>
        {
          [...Array(levels).keys()].map(i => <ListItemLink to={ `/levels/${i}` } primary={ `Level ${i}` } />)
        }
      </List>
    </Paper>
  </Box>
);
