
const validateEmail = (email) => {
  return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return true;
  return password.length >= 8;
};

export { validateEmail, validatePassword };
