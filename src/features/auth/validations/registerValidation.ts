import * as yup from 'yup';

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(3, 'Minimum 3 characters'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email'),

  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Enter valid mobile number'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .matches(/[A-Z]/, 'One uppercase required')
    .matches(/[a-z]/, 'One lowercase required')
    .matches(/[0-9]/, 'One number required')
    .matches(/[!@#$%^&*]/, 'One special character required'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
