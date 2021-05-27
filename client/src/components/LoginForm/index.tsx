import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { authRequest } from '../../reducers/authReducer';
import { Button,  Input } from '@material-ui/core';

function LoginForm () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const onChangeEmail = (event: any) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(authRequest({username, password}));
  }

  return <>
    <form onSubmit={onSubmitHandler}>
      <Input name='email' placeholder="Email" onChange={onChangeEmail} />
      <Input name='password' placeholder="Password" type='password' onChange={onChangePassword} />
      <Button color="primary" variant="contained" type='submit' >LOGIN</Button>
    </form>
  </>
}

export default LoginForm;
