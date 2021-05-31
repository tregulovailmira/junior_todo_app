import React, { useCallback } from 'react';
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
import { TodoStatus } from '../../../enums';

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

  const updateTodoStatus = useCallback(
    (id, status) => {
      const changedStatus =
        status === TodoStatus.IN_PROGRESS ? TodoStatus.DONE : TodoStatus.IN_PROGRESS;
      dispatch(
        updateUserTodoRequest({
          id,
          status: changedStatus,
        }),
      );
    },
    [id, status],
  );

  const deleteTodo = useCallback(
    id => {
      dispatch(deleteUserTodoRequest(id));
    },
    [id],
  );

  return (
    <>
      <ListItem alignItems="center">
        <ListItemText>
          <CustomHeader variant="h3">{header}</CustomHeader>
          <Typography variant="body1">{body}</Typography>
          <ProgressBox component="div">
            <Typography variant="body1">{status}</Typography>
            <Checkbox
              color="primary"
              onClick={(event: React.MouseEvent<HTMLElement>) => updateTodoStatus(id, status)}
              checked={status === TodoStatus.DONE}
            />
          </ProgressBox>
        </ListItemText>
        <Icon
          component={DeleteIcon}
          onClick={(e: React.MouseEvent<SVGSVGElement>) => deleteTodo(id)}
          fontSize="large"
          color="primary"
        />
      </ListItem>
      <Divider />
    </>
  );
}

export default TodoItem;
