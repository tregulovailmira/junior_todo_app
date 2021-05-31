import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateUserTodoRequest, deleteUserTodoRequest } from '../../../payloadCreators/todoPayload';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Typography,
  ListItem,
  Checkbox,
  Icon,
  Box,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const CustomHeader = styled(Typography)({
  fontSize: '1.3rem',
  marginBottom: '8px',
});
const ProgressBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  textTransform: 'capitalize',
});

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
    <>
      <ListItem alignItems="center">
        <ListItemText>
          <CustomHeader variant="h3">{header}</CustomHeader>
          <Typography variant="body1">{body}</Typography>
          <ProgressBox component="div">
            <Typography variant="body1">{status}</Typography>
            <Checkbox color="primary" onClick={updateTodoStatus} checked={status === 'done'} />
          </ProgressBox>
        </ListItemText>
        <Icon component={DeleteIcon} onClick={deleteTodo} fontSize="large" color="primary" />
      </ListItem>
      <Divider />
    </>
  );
}

export default TodoItem;
