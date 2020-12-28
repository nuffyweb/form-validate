const isEmpty = (value) => (value === '');
const isNotEmpty = (value) => (value !== '' && value !== null && typeof value !== 'undefined');
const isEmailValid = (email) => {
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_REGEX.test(email);
};
const isBetween = (length, min, max) => !(length < min || length > max);
const isSame = (fieldOne, fieldTwo) => (fieldOne === fieldTwo);
const isNumber = (value) => (value instanceof Number || typeof value === 'number') && !Number.isNaN(value);
const isPasswordSecure = (password) => (password.length >= 8);
const isString = (value) => (typeof value === 'string');

export {
  isEmpty, isNotEmpty, isEmailValid, isBetween, isSame, isNumber, isPasswordSecure, isString
};
