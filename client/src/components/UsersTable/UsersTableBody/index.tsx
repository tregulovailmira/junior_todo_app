import React from 'react';
import { TableBody } from '@material-ui/core';
import { User } from '../../../interfaces';
import UserRow from './UserRow';

interface TableBodyProps {
  users: User[];
}

function UsersTableBody(props: TableBodyProps) {
  const { users } = props;

  const renderUsers = users.map((user: User) => {
    return <UserRow user={user} key={user.id} />;
  });

  return <TableBody>{renderUsers}</TableBody>;
}

export default UsersTableBody;
