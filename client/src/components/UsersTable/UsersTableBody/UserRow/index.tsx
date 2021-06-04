import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { User } from '../../../../interfaces';
import { deleteUserRequest } from '../../../../payloadCreators/adminUsersPayload';
import { useAppDispatch } from '../../../../app/hooks';

interface UserRowProps {
  user: User;
}

function UserRow(props: UserRowProps) {
  const {
    user: { id, name, email },
  } = props;

  const dispatch = useAppDispatch();
  const history = useHistory();

  const deleteUser = useCallback(e => {
    e.stopPropagation();
    dispatch(deleteUserRequest(id));
  }, []);

  const openUserPage = useCallback(e => {
    e.preventDefault();
    history.push(`/users/${id}`);
  }, []);

  const stopPropagation = useCallback(e => {
    e.stopPropagation();
  }, []);

  return (
    <TableRow hover key={id} onClick={openUserPage}>
      <TableCell>
        <Link to={`/users/${id}/edit`} style={{ color: '#757575' }} onClick={stopPropagation}>
          <EditIcon />
        </Link>
      </TableCell>

      <TableCell>
        <IconButton aria-label="delete" onClick={deleteUser}>
          <DeleteIcon />
        </IconButton>
      </TableCell>

      <TableCell component="th" scope="row" padding="none" align="right">
        {id}
      </TableCell>

      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{email}</TableCell>
    </TableRow>
  );
}

export default UserRow;
