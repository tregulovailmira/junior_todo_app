import React, { useEffect } from 'react';
import { withRouter } from "react-router";
import LoginForm from '../../components/LoginForm';
import {useAppSelector} from "../../app/hooks";

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

  return <LoginForm/>;
}

export default withRouter(Login);
