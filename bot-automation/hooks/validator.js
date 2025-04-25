export const useValidation = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,16}$/;
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (!passwordRegex.test(password)) {
      return "Password must be 8-16 characters, include 1 digit & 1 special character";
    }
    return null;
  };

  const validateName = (name) => {
    if (!name) return "Name is required";
    if (!nameRegex.test(name)) return "Name must be 2-50 letters only";
    return null;
  };

  const validatePhone = (phone) => {
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Invalid phone number format";
    return null;
  };

  const validateAll = ({ email, password, name, phone }) => {
    return {
      email: validateEmail(email),
      password: validatePassword(password),
      name: validateName(name),
      phone: validatePhone(phone),
    };
  };

  return {
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
    validateAll,
  };
};
