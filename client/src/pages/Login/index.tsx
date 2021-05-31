import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import LoginForm from '../../components/LoginForm';
import { useAppSelector } from '../../app/hooks';
import { Typography, Box, FormHelperText } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const CustomTypography = styled(Typography)({
  textAlign: 'center',
  padding: '10px',
  fontSize: '4rem',
  fontWeight: 'normal',
  color: '#2d3da0',
});

const CustomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '600px',
  margin: '100px auto',
  padding: '0 10px',
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

function Login(props: any) {
  const { user, isFetching, error } = useAppSelector(state => state.login);

  useEffect(() => {
    const { history } = props;
    if (user.role === 'user') {
      history.replace('/todos');
    }
    if (user.role === 'admin') {
      history.replace('/admin-dashboard');
    }
  }, [user]);

  return (
    <CustomBox component="div">
      <CustomTypography variant="h1">Login</CustomTypography>
      {error && <CustomError>{error.message}</CustomError>}
      <LoginForm isFetching={isFetching} />
    </CustomBox>
  );
}

export default withRouter(Login);
