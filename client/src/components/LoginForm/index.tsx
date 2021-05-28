import React, { useCallback, useMemo } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useAppDispatch } from '../../app/hooks';
import { authRequest } from '../../reducers/authReducer';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { validationSchema } from '../../validation/validationSchema';

const CustomInput = styled(TextField)({
  margin: '10px 0',
  padding: '10px 0',
});

function LoginForm(props: any) {
  const { isFetching } = props;
  const dispatch = useAppDispatch();

  const memoizedValues = useMemo(() => {
    return {
      username: '',
      password: '',
    };
  }, []);

  const onSubmitHandler = useCallback((values, formikBag) => {
    dispatch(authRequest(values));
    formikBag.resetForm();
  }, []);

  return (
    <Formik
      initialValues={memoizedValues}
      onSubmit={onSubmitHandler}
      validationSchema={validationSchema}
    >
      <Form>
        <Field
          name="username"
          type="text"
          placeholder="Email"
          component={CustomInput}
          fullWidth={true}
        />
        <Field
          name="password"
          type="password"
          placeholder="Password"
          component={CustomInput}
          fullWidth={true}
        />
        <Button color="primary" variant="contained" type="submit" size="large" fullWidth={true}>
          {isFetching ? 'LOADING' : 'LOGIN'}
        </Button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
