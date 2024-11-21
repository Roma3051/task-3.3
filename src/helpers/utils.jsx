export const validateForm = (formData) => {
  let errors = {};

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(formData.username)) {
    errors.username = "Alphabets and numbers only";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (formData.password.length < 8) {
    errors.password = "Password must contain at least 8 symbols";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return errors;
};
