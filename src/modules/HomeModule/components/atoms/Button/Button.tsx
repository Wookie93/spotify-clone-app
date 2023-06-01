import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import './Button.scss';

export const Button = ({
  type = 'button',
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button type={type} className="button button-primary" {...props}>
      Next Step
    </button>
  );
};
