import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodosRequest } from '../../payloadCreators/todoPayload';
import TodoItem from './TodoItem';
import { Box, Typography, List } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner';

const CustomBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '40px',
  margin: '10px',
});

const ListBox = styled(Box)({
  maxWidth: '300px',
  width: '100%',
  height: '100%',
  boxShadow: '0px 0px 8px 0px rgba(34, 60, 80, 0.2)',
  padding: '15px',
});

const CustomHeader = styled(Typography)({
  fontSize: '1.8rem',
  marginBottom: '10px',
});

const CustomError = styled(Typography)({
  color: 'red',
  textAlign: 'center',
  fontSize: '1.5rem',
  position: 'absolute',
  top: '55px',
  left: '50%',
  transform: 'translate(-50%)',
  lineHeight: '1',
});

function TodoList() {
  const dispatch = useAppDispatch();
  const { todos, error, isFetching } = useAppSelector(state => state.todos);

  const getTodos = useCallback(() => {
    dispatch(getTodosRequest());
  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  const renderInProgressTasks = useMemo(
    () =>
      todos.map(todo => {
        if (todo.status === 'in progress') {
          return <TodoItem key={todo.id} todo={todo} />;
        }
      }),
    [todos],
  );

  const renderDoneTasks = useMemo(
    () =>
      todos.map(todo => {
        if (todo.status === 'done') {
          return <TodoItem key={todo.id} todo={todo} />;
        }
      }),
    [todos],
  );
  if (error) {
    return <CustomError>{error.message}</CustomError>;
  }

  if (isFetching) {
    return (
      <Box component="div" margin="0 auto">
        <Loader type="Puff" color="#3f51b5" height={100} width={100} />
      </Box>
    );
  }

  return (
    <CustomBox>
      <ListBox component="div">
        <CustomHeader variant="h2">In Progress</CustomHeader>
        <List>{renderInProgressTasks}</List>
      </ListBox>
      <ListBox component="div">
        <CustomHeader variant="h2">Done</CustomHeader>
        <List>{renderDoneTasks}</List>
      </ListBox>
    </CustomBox>
  );
}

export default TodoList;
