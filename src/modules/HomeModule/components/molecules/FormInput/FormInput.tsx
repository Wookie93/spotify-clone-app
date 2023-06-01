import React from 'react';
import './FormInput.scss';
import { FormInputProps } from '@/modules/HomeModule/interfaces/FormInterfaces';

export const FormInput = ({
  type = 'text',
  name,
  placeholder,
  label,
  onChange,
  errmsg,
  ...props
}: FormInputProps) => {
  return (
    <div className="form-input-wrap">
      <label className="form-input-wrap__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-input-wrap__input"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      {errmsg && <p className="form-input-wrap__error-message">{errmsg}</p>}
    </div>
  );
};
