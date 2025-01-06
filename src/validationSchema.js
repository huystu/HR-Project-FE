import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a vaild email address.')
    .required('Email is required.'),
  pw: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .required('Password is required.'),
});
