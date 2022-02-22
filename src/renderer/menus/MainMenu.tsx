import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ListItemLink } from "../ListItemLink";

export const MainMenu = () => (
  <Box sx={{ width: 1 }}>
    <Paper elevation={0}>
      <List>
        <ListItemLink to="/level_menu" primary="Free Play" icon={<PlayArrowIcon />} />
        <ListItemLink to="/level_creator" primary="Level Creator" icon={<PlayArrowIcon />} />
      </List>
      <Divider />
      <List>
        <ListItemLink to="/settings" primary="Settings" icon={<SettingsIcon />} />
        <ListItemLink to="/exit" primary="Exit" icon={<LogoutIcon />} />
      </List>
    </Paper>
  </Box>
);
