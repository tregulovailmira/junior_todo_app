import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import LoginForm from '../../components/LoginForm';
import { useAppSelector } from "../../app/hooks";
import { Typography, Box } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';

const CustomTypography = styled(Typography)({
  textAlign: 'center',
  padding: '10px',
  fontSize: '4rem',
  fontWeight: 'normal',
  color: '#2d3da0'
});

const CustomBox = styled(Box)({
  display: "flex",
  flexDirection: 'column',
});

function Login (props: any) {
  const user = useAppSelector((state) => state.login.user);

  useEffect(() => {
    const { history } = props;
    if(user.role === 'user') {
      history.replace('/todos')
    }
    if(user.role === 'admin') {
      history.replace('/admin-dashboard')
    }
  }, [user]);

  return <CustomBox component='div'>
      <CustomTypography variant="h1">Login</CustomTypography>
      <LoginForm/>;
  </CustomBox>
}

export default withRouter(Login);
