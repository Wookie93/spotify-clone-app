import { InputHTMLAttributes } from 'react';

export interface IForm {
  [key: string]: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
}

export interface IBasicValidator {
  [key: string]: (value: string) => boolean | string;
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name: string;
  placeholder: string;
  label: string;
  onChange: any;
  errmsg?: string;
}
