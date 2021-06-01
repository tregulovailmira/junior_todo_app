import React from 'react';
import TodoList from '../../components/TodoList';
import { Link, Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const CustomLink = styled(Link)({
  fontSize: '1.5rem',
  textAlign: 'center',
  cursor: 'pointer',
  margin: '15px',
});

const CustomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

function UserDashboard() {
  return (
    <CustomBox>
      <CustomLink href="/todos/create" color="primary">
        {'New Todo'}
      </CustomLink>
      <TodoList />
    </CustomBox>
  );
}

export default UserDashboard;
