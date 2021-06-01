import React, { useCallback, useMemo } from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { useAppDispatch } from '../../app/hooks';
import { createTodoRequest } from '../../payloadCreators/todoPayload';
import { TodoStatus } from '../../enums';
import { Button, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from 'formik-material-ui-pickers';
import { styled } from '@material-ui/core/styles';

const CustomTextField = styled(TextField)({
  margin: '10px 0',
  padding: '10px 0',
});

const CustomForm = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '20px',
  boxShadow: '0px 0px 8px 0px rgba(34, 60, 80, 0.2)',
});

function CreateTodoForm() {
  const dispatch = useAppDispatch();

  const memoizedValues = useMemo(() => {
    return {
      header: '',
      body: '',
      status: TodoStatus.IN_PROGRESS,
      deadline: new Date(),
    };
  }, []);

  const onSubmitHandler = useCallback((values, formikBag) => {
    dispatch(createTodoRequest(values));
    formikBag.resetForm();
  }, []);

  return (
    <Formik initialValues={memoizedValues} onSubmit={onSubmitHandler}>
      <CustomForm>
        <Field name="header" component={CustomTextField} placeholder="Header" />
        <Field name="body" component={CustomTextField} multiline={true} placeholder="Description" />
        <Field name="status" as="select" component={Select} placeholder="status">
          <MenuItem value={TodoStatus.IN_PROGRESS}>{TodoStatus.IN_PROGRESS}</MenuItem>
          <MenuItem value={TodoStatus.DONE} selected>
            {TodoStatus.DONE}
          </MenuItem>
        </Field>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Field component={DatePicker} name="deadline" />
        </MuiPickersUtilsProvider>
        <Button type="submit" size="large" variant="contained" color="primary">
          Create
        </Button>
      </CustomForm>
    </Formik>
  );
}
export default CreateTodoForm;
