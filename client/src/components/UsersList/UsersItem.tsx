import React from 'react';
import { User } from '../../interfaces';
import { ListItem, ListItemText, Typography } from '@material-ui/core';

interface UsersItemProps {
  user: User;
}

function UsersItem(props: UsersItemProps) {
  const {
    user: { id, name, email },
  } = props;

  return (
    <ListItem>
      <ListItemText>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body1">{id}</Typography>
        <Typography variant="body2">{email}</Typography>
      </ListItemText>
    </ListItem>
  );
}

export default UsersItem;
