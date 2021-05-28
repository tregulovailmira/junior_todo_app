import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { authRequest } from '../../reducers/authReducer';
import { FormGroup, Button,  Input } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const CustomFormGroup = styled(FormGroup)({
  margin: '0 auto',
  padding: '10px'
});

const CustomInput = styled(Input)({
  margin: '10px 0',
  padding: '10px',
});

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
  };

  return (
    <CustomFormGroup>
      <form onSubmit={onSubmitHandler}>
        <CustomInput name='email' placeholder="Email" onChange={onChangeEmail} fullWidth={true}/>
        <CustomInput name='password' placeholder="Password" type='password' onChange={onChangePassword} fullWidth={true} />
        <Button color="primary" variant="contained" type='submit' size="large" fullWidth={true}>LOGIN</Button>
      </form>
    </CustomFormGroup>
  )

}

export default LoginForm;
