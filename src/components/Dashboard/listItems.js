import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BadgeIcon from '@mui/icons-material/Badge';
import { unstable_HistoryRouter } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

export const mainListItems = (
  <div>
    {/* <ListItem button onClick={()=>window.location.href='/dashboard'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="後台首頁" />
    </ListItem>
    <ListItem button onClick={()=>window.location.href='/member'}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="會員資訊" />
    </ListItem> */}
   {/*  <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem> */}
   {/*  <ListItem button onClick={()=>window.location.href='/github'}>
      <ListItemIcon>
        <GitHubIcon />
      </ListItemIcon>
      <ListItemText primary="版控狀態" />
    </ListItem>
 */}
    <ListItem button onClick={()=>window.location.href='/crud'}>
      <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Player List" />
    </ListItem>
   {/*  <ListItem button onClick={()=>window.location.href='/employee'}>
      <ListItemIcon>
        <BadgeIcon />
      </ListItemIcon>
      <ListItemText primary="Employee" />
    </ListItem> */}
  </div>
);

export const secondaryListItems = (
  <div>
    
    {/* <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
