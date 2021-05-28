import * as yup from 'yup';

export const validationSchema = yup.object({
  username: yup.string().email().required('This is a required field!'),
  password: yup.string().min(6).max(128).required(),
});
