import * as yup from 'yup';

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .min(6)
    .max(255)
    .email()
    .required(),
});
