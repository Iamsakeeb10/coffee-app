export const createAccountValidation = (
  name: string,
  email: string,
  password: string,
  confirmedPassword: string,
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
    errors.nameError = 'Name is required';
  } else if (trimmedName.length > 49) {
    errors.nameError = 'Please enter less than 50 characters';
  } else if (trimmedName.length < 3) {
    errors.nameError = 'Please enter at least 3 characters';
  } else if (!validNameRegex.test(trimmedName)) {
    errors.nameError =
      'Full name can only contain letters, spaces, dots, first bracket & dashes';
  }

  if (!trimmedEmail) {
    errors.emailError = `Email is required`;
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.emailError = `Please enter a valid email address`;
  } else if (trimmedEmail.length > 100) {
    errors.emailError = `Email should not contain more than 100 characters`;
  }

  if (!trimmedPassword) {
    errors.passwordError = `Password is required`;
  } else if (trimmedPassword.length >= 32) {
    errors.passwordError = `Password must be less than 32 characters`;
  } else if (trimmedPassword.length < 8) {
    errors.passwordError = `Password must be at least 8 characters`;
  }

  if (!trimmedReTypePassword) {
    errors.confirmPasswordError = `Confirm password is required`;
  } else if (trimmedReTypePassword.length >= 32) {
    errors.confirmPasswordError = `Password must be less than 32 characters`;
  } else if (trimmedReTypePassword.length < 8) {
    errors.confirmPasswordError = `Password must be at least 8 characters`;
  }

  if (trimmedPassword !== trimmedReTypePassword) {
    errors.confirmPasswordError = `Password not matched`;
  }

  return errors;
};

export const loginValidation = (email: string, password: string) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  const errors = {
    emailError: '',
    passwordError: '',
  };

  if (!trimmedEmail) {
    errors.emailError = `Email is required`;
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.emailError = `Please enter a valid email address`;
  } else if (trimmedEmail.length > 100) {
    errors.emailError = `Email should not contain more than 100 characters`;
  }

  if (!trimmedPassword) {
    errors.passwordError = `Password is required`;
  } else if (trimmedPassword.length >= 32) {
    errors.passwordError = `Password must be less than 32 characters`;
  } else if (trimmedPassword.length < 8) {
    errors.passwordError = `Password must be at least 8 characters`;
  }

  return errors;
};
