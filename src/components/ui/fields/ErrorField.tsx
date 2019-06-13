import { FieldProps } from 'formik';
import React from 'react';
import { ErrorDiv, InputHolder } from '../ErrorField';

export const ErrorField = ({ form: { errors } }: FieldProps) => {
  const errorMessage = errors.default;
  if (!errorMessage) {
    return null;
  }

  return (
    <InputHolder>
      {errorMessage && (
        <ErrorDiv style={{ color: 'red' }}>{errorMessage}</ErrorDiv>
      )}
    </InputHolder>
  );
};
