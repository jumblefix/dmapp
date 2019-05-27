import * as yup from 'yup';

export const productSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3)
    .max(255)
    .required(),
  coverImage: yup
    .string()
    .trim()
    .min(3)
    .max(255)
    .required(),
  description: yup
    .string()
    .trim()
    .min(50)
    .required(),
  rating: yup
    .number()
    .min(0)
    .max(10)
    .required(),
  offerPrice: yup
    .number()
    .min(1)
    .required(),
  price: yup
    .number()
    .min(1)
    .required(),
});
