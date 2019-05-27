import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3)
    .max(100)
    .required(),
  email: yup
    .string()
    .trim()
    .min(6)
    .max(255)
    .email()
    .required(),
  password: yup
    .string()
    .min(6)
    .max(255)
    .required(),
});
