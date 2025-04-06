export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

export function validatePhoneNumber(phone) {
  // Basic international phone validation
  const re = /^\+[1-9]\d{1,14}$/;
  return re.test(phone);
}
