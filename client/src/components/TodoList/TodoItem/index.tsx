import React, { useCallback } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateUserTodoRequest, deleteUserTodoRequest } from '../../../payloadCreators/todoPayload';
import { uploadUserAttachmentRequest } from '../../../payloadCreators/attachmentPayload';
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
import AttachmentUploader from '../../AttachmentUploader';
import { Todo } from '../../../interfaces';

const CustomHeader = styled(Typography)({
  fontSize: '1.3rem',
  marginBottom: '8px',
});
const ProgressBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  textTransform: 'capitalize',
});

interface TodoItemProps {
  todo: Todo;
}

function TodoItem(props: TodoItemProps) {
  const {
    todo: { header, status, id, deadline },
  } = props;

  const dispatch = useAppDispatch();

  const updateTodoStatus = useCallback(() => {
    const changedStatus =
      status === TodoStatus.IN_PROGRESS ? TodoStatus.DONE : TodoStatus.IN_PROGRESS;
    dispatch(
      updateUserTodoRequest({
        id,
        status: changedStatus,
      }),
    );
  }, [id, status]);

  const deleteTodo = useCallback(() => {
    dispatch(deleteUserTodoRequest(id));
  }, [id]);

  return (
    <AttachmentUploader todoId={id} uploadAttachment={uploadUserAttachmentRequest}>
      <ListItem alignItems="center">
        <ListItemText>
          <CustomHeader variant="h3">{header}</CustomHeader>
          <ProgressBox component="div">
            <Typography variant="body1">{status}</Typography>
            <Checkbox
              color="primary"
              onClick={updateTodoStatus}
              checked={status === TodoStatus.DONE}
            />
          </ProgressBox>
          <Typography variant="body2">Deadline: {deadline}</Typography>
        </ListItemText>
        <Icon component={DeleteIcon} onClick={deleteTodo} fontSize="large" color="primary" />
      </ListItem>
      <Divider />
    </AttachmentUploader>
  );
}

export default TodoItem;
