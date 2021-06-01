import React from 'react';
import CreateTodoForm from '../../components/CreateTodoForm';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const CustomBox = styled(Box)({
  maxWidth: '600px',
  margin: '100px auto',
});

function CreateTodo() {
  return (
    <CustomBox>
      <CreateTodoForm />
    </CustomBox>
  );
}

export default CreateTodo;
