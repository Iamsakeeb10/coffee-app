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
