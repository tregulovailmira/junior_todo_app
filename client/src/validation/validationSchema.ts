import * as yup from 'yup';
import { startOfDay } from 'date-fns';

export const validationSchema = yup.object({
  username: yup.string().email().required('This is a required field!'),
  password: yup.string().min(6).max(128).required(),
});

export const createTodoValidationSchema = yup.object({
  header: yup.string().min(2).max(128).required(),
  body: yup.string().required(),
  status: yup.string().required(),
  deadline: yup.date().min(startOfDay(new Date())).required(),
});
