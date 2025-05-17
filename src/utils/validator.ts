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
