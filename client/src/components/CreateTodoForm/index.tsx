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
      <Form>
        <Field name="header" component={TextField} />
        <Field name="body" component={TextField} multiline={true} />
        <Field name="status" as="select" component={Select} placeholder="status">
          <MenuItem value={TodoStatus.IN_PROGRESS}>{TodoStatus.IN_PROGRESS}</MenuItem>
          <MenuItem value={TodoStatus.DONE} selected>
            {TodoStatus.DONE}
          </MenuItem>
        </Field>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Field component={DatePicker} name="deadline" />
        </MuiPickersUtilsProvider>
        <Button type="submit">Create</Button>
      </Form>
    </Formik>
  );
}
export default CreateTodoForm;
