import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodosRequest } from '../../payloadCreators/todoPayload';
import TodoItem from './TodoItem';
import { Box, Typography, List } from '@material-ui/core';

function TodoList() {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(getTodosRequest());
  }, []);

  const renderInProgressTasks = () =>
    todos.map(todo => {
      if (todo.status === 'in progress') {
        return <TodoItem key={todo.id} todo={todo} />;
      }
    });

  const renderDoneTasks = () =>
    todos.map(todo => {
      if (todo.status === 'done') {
        return <TodoItem key={todo.id} todo={todo} />;
      }
    });

  return (
    <>
      <Box>
        <Typography variant="h2">In Progress</Typography>
        <List>{renderInProgressTasks()}</List>
      </Box>
      <Box>
        <Typography variant="h2">Done</Typography>
        <List>{renderDoneTasks()}</List>
      </Box>
    </>
  );
}

export default TodoList;
