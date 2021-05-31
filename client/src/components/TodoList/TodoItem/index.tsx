import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateUserTodoRequest, deleteUserTodoRequest } from '../../../payloadCreators/todoPayload';
import DeleteIcon from '@material-ui/icons/Delete';

import { Typography, ListItem, Checkbox, Icon } from '@material-ui/core';

function TodoItem(props: any) {
  const {
    todo: { header, body, status, id },
  } = props;

  const dispatch = useAppDispatch();

  const updateTodoStatus = () => {
    const changedStatus = status === 'in progress' ? 'done' : 'in progress';
    dispatch(
      updateUserTodoRequest({
        id,
        status: changedStatus,
      }),
    );
  };

  const deleteTodo = () => {
    dispatch(deleteUserTodoRequest(id));
  };

  return (
    <ListItem>
      <Typography variant="h4">{header}</Typography>
      <Typography variant="body1">{body}</Typography>
      <Typography variant="body1">{status}</Typography>
      <Checkbox onClick={updateTodoStatus} checked={status === 'done'} />
      <Icon component={DeleteIcon} onClick={deleteTodo} />
    </ListItem>
  );
}

export default TodoItem;
