import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getTodosRequest } from '../../payloadCreators/todoPayload';
import TodoItem from './TodoItem';
import { Box, Typography, List } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

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
  boxShadow: '0px 0px 8px 0px rgba(34, 60, 80, 0.2)',
  padding: '15px',
});

const CustomHeader = styled(Typography)({
  fontSize: '1.8rem',
  marginBottom: '10px',
});

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
    <CustomBox>
      <ListBox component="div">
        <CustomHeader variant="h2">In Progress</CustomHeader>
        <List>{renderInProgressTasks()}</List>
      </ListBox>
      <ListBox component="div">
        <CustomHeader variant="h2">Done</CustomHeader>
        <List>{renderDoneTasks()}</List>
      </ListBox>
    </CustomBox>
  );
}

export default TodoList;
