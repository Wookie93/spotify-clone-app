import React from 'react';
import './PaymentForm.scss';
import { Button } from '../../atoms/Button/Button';
import { FormInput } from '../../molecules/FormInput/FormInput';
import {
  IForm,
  IBasicValidator,
} from '@/modules/HomeModule/interfaces/FormInterfaces';

export const PaymentForm = () => {
  const initialState = {
    name: {
      value: '',
      isValid: false,
      errorMessage: '',
    },
    cardNumber: {
      value: '',
      isValid: false,
      errorMessage: '',
    },
    expiryDate: {
      value: '',
      isValid: false,
      errorMessage: '',
    },
    CVV: {
      value: '',
      isValid: false,
      errorMessage: '',
    },
  };

  const [form, setForm] = React.useState<IForm>(initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) console.log(form);
  };

  const isFormValid = React.useMemo(
    () => Object.values(form).every(({ isValid }) => isValid),
    [form]
  );

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const validator = basicValidator[name];
    let isValid = true;
    let errorMessage = '';

    if (validator) {
      const validatorValue = validator(value);

      if (typeof validatorValue === 'string') {
        isValid = !validatorValue;
        errorMessage = validatorValue;
      }
    }

    setForm({
      ...form,
      [name]: { ...form[name], value, isValid, errorMessage },
    });
  };

  const basicValidator: IBasicValidator = {
    name: (value: string) =>
      /([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,} )([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,})/.test(
        String(value)
      ) || 'Full name is incorrect',
    cardNumber: (value: string) =>
      /^\d{16}$/.test(String(value)) ||
      'Card number is incorrect. It must be 16 characters long',
    CVV: (value: string) =>
      /^\d{3}$/.test(String(value)) || 'Write correct CVV number',
  };

  const maskForDate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    let value = input.value;
    const regex = /^(\d{1,2})(\/)?(\d{0,2})$/;
    const isMatch = input.value.match(regex);

    if (
      e.key !== 'Backspace' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight'
    ) {
      if (isMatch) {
        const month = isMatch[1];
        const slash = isMatch[2] || '';

        if (month.length === 1 && month > '3') value = `0${month}/`;
        else if (month.length === 2 && slash === '')
          month > '31' ? (value = `31/`) : (value = `${month}/`);
      }
    }

    value = value.replace(/[^0-9/]/g, '');

    return (input.value = value);
  };

  return (
    <div className="payment-form">
      <div className="payment-form__innerwrap">
        <h2 className="payment-form__title">Add your informations</h2>
        <form className="payment-form__form" onSubmit={handleSubmit}>
          <div className="payment-form__input-wrap">
            <FormInput
              name="name"
              placeholder="Name on card"
              label="Name on card"
              onChange={handleFormChange}
              errmsg={form['name'].errorMessage}
              required
            />
            <FormInput
              type="number"
              name="cardNumber"
              placeholder="Card number"
              label="Card number"
              onChange={handleFormChange}
              errmsg={form['cardNumber'].errorMessage}
              required
            />
            <div className="payment-form__inner-input-wrap">
              <FormInput
                name="expiryDate"
                placeholder="Expiry date (MM/YY)"
                label="Expiry date"
                onChange={handleFormChange}
                onKeyUp={maskForDate}
                maxLength={5}
                required
              />
              <FormInput
                type="number"
                name="CVV"
                placeholder="CVV"
                label="CVV"
                onChange={handleFormChange}
                errmsg={form['CVV'].errorMessage}
                required
                maxLength={3}
              />
            </div>
          </div>
          <Button type="submit" disabled={!isFormValid} />
        </form>
      </div>
      <div className="img-container">
        <picture>
          <source
            srcSet="src/assets/images/product/product-mobile.png"
            media="(max-width: 480px)"
          />
          <source
            srcSet="src/assets/images/product/product-tablet.png"
            media="(max-width: 1024px)"
          />
          <img
            src="src/assets/images/product/product-desktop.png"
            alt="product"
          />
        </picture>
      </div>
    </div>
  );
};
