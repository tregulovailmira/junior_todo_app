import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateUserTodoRequest } from '../../../payloadCreators/todoPayload';

import { Typography, ListItem, Checkbox } from '@material-ui/core';

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

  return (
    <ListItem>
      <Typography variant="h4">{header}</Typography>
      <Typography variant="body1">{body}</Typography>
      <Typography variant="body1">{status}</Typography>
      <Checkbox onClick={updateTodoStatus} checked={status === 'done'} />
    </ListItem>
  );
}

export default TodoItem;
