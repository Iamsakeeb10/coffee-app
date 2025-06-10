import {PaymentFormData} from '../types/Checkout/PaymentForm.type';
import {ShippingFormData} from '../types/Checkout/ShippingForm.type';

export const createAccountValidation = (
  name: string,
  email: string,
  password: string,
  confirmedPassword: string,
  t: Function,
) => {
  const validNameRegex = /^[a-zA-Z\s.'()-]+$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  const trimmedReTypePassword = confirmedPassword.trim();

  const errors = {
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  };

  if (!trimmedName) {
    errors.nameError = t('auth.nameErrorRequired');
  } else if (trimmedName.length > 49) {
    errors.nameError = t('auth.nameErrorMax');
  } else if (trimmedName.length < 3) {
    errors.nameError = t('auth.nameErrorMin');
  } else if (!validNameRegex.test(trimmedName)) {
    errors.nameError = t('auth.nameErrorInvalid');
  }

  if (!trimmedEmail) {
    errors.emailError = t('auth.emailErrorRequired');
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.emailError = t('auth.emailErrorInvalid');
  } else if (trimmedEmail.length > 100) {
    errors.emailError = t('auth.emailErrorMax');
  }

  if (!trimmedPassword) {
    errors.passwordError = t('auth.passwordErrorRequired');
  } else if (trimmedPassword.length >= 32) {
    errors.passwordError = t('auth.passwordErrorMax');
  } else if (trimmedPassword.length < 8) {
    errors.passwordError = t('auth.passwordErrorMin');
  }

  if (!trimmedReTypePassword) {
    errors.confirmPasswordError = t('auth.confirmPasswordErrorRequired');
  } else if (trimmedReTypePassword.length >= 32) {
    errors.confirmPasswordError = t('auth.confirmPasswordErrorMax');
  } else if (trimmedReTypePassword.length < 8) {
    errors.confirmPasswordError = t('auth.confirmPasswordErrorMin');
  }

  if (trimmedPassword !== trimmedReTypePassword) {
    errors.confirmPasswordError = t('auth.confirmPasswordErrorNotMatched');
  }

  return errors;
};

export const loginValidation = (
  email: string,
  password: string,
  t: Function,
) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const errors = {
    emailError: '',
    passwordError: '',
  };

  if (!trimmedEmail) {
    errors.emailError = t('auth.emailErrorRequired');
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.emailError = t('auth.emailErrorInvalid');
  } else if (trimmedEmail.length > 100) {
    errors.emailError = t('auth.emailErrorMax');
  }

  if (!trimmedPassword) {
    errors.passwordError = t('auth.passwordErrorRequired');
  } else if (trimmedPassword.length >= 32) {
    errors.passwordError = t('auth.passwordErrorMax');
  } else if (trimmedPassword.length < 8) {
    errors.passwordError = t('auth.passwordErrorMin');
  }

  return errors;
};

export const validateShippingForm = (
  form: ShippingFormData,
): Partial<Record<keyof ShippingFormData, string>> => {
  const errors: Partial<Record<keyof ShippingFormData, string>> = {};

  if (!form.fullName) errors.fullName = 'Full name is required';
  if (!form.address) errors.address = 'Address is required';
  if (!form.city) errors.city = 'City is required';
  if (!form.state) errors.state = 'State is required';
  if (!form.thana) errors.thana = 'Thana is required';
  if (!form.country) errors.country = 'Country is required';
  if (!form.phone) errors.phone = 'Phone number is required';
  if (!form.email) errors.email = 'Email is required';

  return errors;
};

export const validatePaymentForm = (
  form: PaymentFormData,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  const cardNumberCleaned = form.cardNumber.replace(/\s/g, '');

  if (!cardNumberCleaned || cardNumberCleaned.length < 15) {
    errors.cardNumber = 'Invalid card number';
  }

  if (!form.cardholderName || form.cardholderName.trim() === '') {
    errors.cardholderName = 'Cardholder name required';
  }

  if (!form.expirationDate || form.expirationDate.length !== 5) {
    errors.expirationDate = 'Invalid expiration date';
  } else {
    const [month, year] = form.expirationDate.split('/');
    const expiryMonth = parseInt(month, 10);
    const expiryYear = parseInt(year, 10);

    if (
      isNaN(expiryMonth) ||
      isNaN(expiryYear) ||
      expiryMonth < 1 ||
      expiryMonth > 12
    ) {
      errors.expirationDate = 'Invalid month';
    }

    const expiryDate = new Date();
    expiryDate.setFullYear(2000 + expiryYear, expiryMonth - 1, 1);

    const currentDate = new Date();
    if (expiryDate < currentDate) {
      errors.expirationDate = 'Card expired';
    }
  }

  if (!form.cvv || form.cvv.length < 3) {
    errors.cvv = 'Invalid CVV';
  }

  return errors;
};
