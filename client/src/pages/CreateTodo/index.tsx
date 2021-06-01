import React from 'react';
import CreateTodoForm from '../../components/CreateTodoForm';
import { Box, FormHelperText, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useAppSelector } from '../../app/hooks';

const CustomBox = styled(Box)({
  maxWidth: '600px',
  margin: '100px auto',
});

const CustomTypography = styled(Typography)({
  textAlign: 'center',
  padding: '10px',
  fontSize: '3.5rem',
  fontWeight: 'normal',
  color: '#2d3da0',
});

const CustomError = styled(FormHelperText)({
  color: 'red',
  textAlign: 'center',
  fontSize: '1.2rem',
  position: 'absolute',
  top: '44px',
  left: '50%',
  transform: 'translate(-50%)',
  lineHeight: '1',
});

function CreateTodo() {
  const { isFetching, error } = useAppSelector(state => state.todos);

  return (
    <CustomBox>
      <CustomTypography variant="h1">CREATE NEW TODO</CustomTypography>
      {error && <CustomError>{error.message}</CustomError>}
      <CreateTodoForm isFetching={isFetching} />
    </CustomBox>
  );
}

export default CreateTodo;
