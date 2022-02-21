import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

export const mainListItems = (
  <div>
    
    <ListItem button onClick={()=>window.location.href='/crud'}>
      <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Player List" />
    </ListItem>
  
  </div>
);

export const secondaryListItems = (
  <div>
  </div>
);
