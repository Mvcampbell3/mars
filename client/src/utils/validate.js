import validator from 'email-validator';

export const emailValidate = (email) => {
  const isEmail = validator.validate(email);
  return isEmail;
}

export const passwordValidate = (password) => {
  if (password.split("").length >= 6) {
    return true;
  }
  return false;
}