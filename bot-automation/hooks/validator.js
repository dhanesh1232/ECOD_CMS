"use client";
import zxcvbn from "zxcvbn";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { useCallback, useState } from "react";
export const countryPhoneRules = [
  { country: "US", code: "1", lengths: [10] }, // United States
  { country: "CA", code: "1", lengths: [10] }, // Canada
  { country: "GB", code: "44", lengths: [10, 11] }, // United Kingdom
  { country: "IN", code: "91", lengths: [10] }, // India
  { country: "DE", code: "49", lengths: [10, 11] }, // Germany
  { country: "FR", code: "33", lengths: [9] }, // France
  { country: "BR", code: "55", lengths: [10, 11] }, // Brazil
  { country: "IT", code: "39", lengths: [9, 10] }, // Italy
  { country: "ES", code: "34", lengths: [9] }, // Spain
  { country: "AU", code: "61", lengths: [9] }, // Australia
  { country: "JP", code: "81", lengths: [10] }, // Japan
  { country: "CN", code: "86", lengths: [11] }, // China
  { country: "RU", code: "7", lengths: [10] }, // Russia
  { country: "ID", code: "62", lengths: [9, 10, 11] }, // Indonesia
  { country: "NG", code: "234", lengths: [10] }, // Nigeria
  { country: "PK", code: "92", lengths: [10] }, // Pakistan
  { country: "BD", code: "880", lengths: [10] }, // Bangladesh
  { country: "MX", code: "52", lengths: [10] }, // Mexico
  { country: "PH", code: "63", lengths: [10] }, // Philippines
  { country: "VN", code: "84", lengths: [9, 10] }, // Vietnam
  { country: "ET", code: "251", lengths: [9] }, // Ethiopia
  { country: "EG", code: "20", lengths: [10] }, // Egypt
  { country: "TR", code: "90", lengths: [10] }, // Turkey
  { country: "IR", code: "98", lengths: [10] }, // Iran
  { country: "TH", code: "66", lengths: [9] }, // Thailand
  { country: "ZA", code: "27", lengths: [9] }, // South Africa
  { country: "CO", code: "57", lengths: [10] }, // Colombia
  { country: "AR", code: "54", lengths: [10] }, // Argentina
  { country: "MY", code: "60", lengths: [9, 10] }, // Malaysia
  { country: "SA", code: "966", lengths: [9] }, // Saudi Arabia
  { country: "KR", code: "82", lengths: [9, 10] }, // South Korea
  { country: "PL", code: "48", lengths: [9] }, // Poland
  { country: "UA", code: "380", lengths: [9] }, // Ukraine
  { country: "DZ", code: "213", lengths: [9] }, // Algeria
  { country: "KE", code: "254", lengths: [9] }, // Kenya
  { country: "SD", code: "249", lengths: [9] }, // Sudan
  { country: "PE", code: "51", lengths: [9] }, // Peru
  { country: "NL", code: "31", lengths: [9] }, // Netherlands
  { country: "BE", code: "32", lengths: [9] }, // Belgium
  { country: "SE", code: "46", lengths: [9] }, // Sweden
  { country: "CH", code: "41", lengths: [9] }, // Switzerland
  { country: "AT", code: "43", lengths: [10, 11] }, // Austria
  { country: "CZ", code: "420", lengths: [9] }, // Czech Republic
  { country: "RO", code: "40", lengths: [9] }, // Romania
  { country: "HU", code: "36", lengths: [9] }, // Hungary
  { country: "GR", code: "30", lengths: [10] }, // Greece
  { country: "PT", code: "351", lengths: [9] }, // Portugal
  { country: "DK", code: "45", lengths: [8] }, // Denmark
  { country: "FI", code: "358", lengths: [9, 10] }, // Finland
  { country: "NO", code: "47", lengths: [8] }, // Norway
];

// Email validation
export const validateEmail = (email) => {
  if (!email) return { valid: false, message: "Email is required" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, message: "Invalid email format" };
  }
  return { valid: true };
};

// Password validation
export const validatePassword = (password) => {
  const errors = [];

  if (!password) {
    return { valid: false, message: "Password is required" };
  }

  if (password.length < 8) {
    errors.push("at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("one uppercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("one number");
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push("one special character");
  }

  if (errors.length > 0) {
    return {
      valid: false,
      message: `Password must contain: ${errors.join(", ")}`,
      requirements: errors,
    };
  }

  // Check password strength
  const { score } = zxcvbn(password);
  if (score < 3) {
    // Require at least "good" password
    return { valid: false, message: "Password is too weak" };
  }

  return { valid: true, score };
};

// Phone number validation

export const validatePhoneNumber = (phoneNumber, countryCode = null) => {
  if (!phoneNumber || typeof phoneNumber !== "string") {
    return { valid: false, message: "Phone number is required" };
  }

  try {
    const phone = parsePhoneNumberFromString(phoneNumber, countryCode);

    if (!phone) {
      return { valid: false, message: "Invalid phone number format" };
    }

    if (!phone.isValid()) {
      return { valid: false, message: "Invalid phone number" };
    }

    const type = phone.getType();
    if (type === "FIXED_LINE" || type === "TOLL_FREE") {
      return { valid: false, message: "Only mobile numbers are allowed" };
    }

    const nationalNumber = phone.nationalNumber;
    const detectedCountry = phone.country;

    const countryRule = countryPhoneRules.find(
      (c) => c.country === detectedCountry
    );

    if (countryRule) {
      if (!countryRule.lengths.includes(nationalNumber.length)) {
        return {
          valid: false,
          message: `Phone number must be ${countryRule.lengths.join(
            " or "
          )} digits for ${detectedCountry}`,
          country: detectedCountry,
        };
      }
    }

    return {
      valid: true,
      country: detectedCountry,
      countryCode: phone.countryCallingCode,
      nationalNumber,
    };
  } catch (error) {
    console.error("Phone validation error:", error);
    return { valid: false, message: "Invalid phone number" };
  }
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { valid: false, message: "Please confirm your password" };
  }
  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match" };
  }
  return { valid: true };
};

// Full form validation
export const validateProfileForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Name validation
  if (!formData.name?.trim()) {
    errors.name = "Name is required";
    isValid = false;
  }

  // Email validation
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.message;
    isValid = false;
  }

  // Phone validation
  const phoneValidation = validatePhoneNumber(formData.phone, formData.country);
  if (!phoneValidation.valid) {
    errors.phone = phoneValidation.message;
    isValid = false;
  }

  // Password validation
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.message;
    isValid = false;
  }

  // Confirm password validation
  const confirmValidation = validateConfirmPassword(
    formData.password,
    formData.confirmPassword
  );
  if (!confirmValidation.valid) {
    errors.confirmPassword = confirmValidation.message;
    isValid = false;
  }

  return { isValid, errors };
};

// Custom hook for form validation
export const useFormValidator = (initialState) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value, formData) => {
    let validationResult;

    switch (name) {
      case "email":
        validationResult = validateEmail(value);
        break;
      case "phone":
        validationResult = validatePhoneNumber(value, formData.country);
        break;
      case "password":
        validationResult = validatePassword(value);
        break;
      case "confirmPassword":
        validationResult = validateConfirmPassword(formData.password, value);
        break;
      case "name":
        validationResult = {
          valid: !!value?.trim(),
          message: "Name is required",
        };
        break;
      default:
        validationResult = { valid: true };
    }

    if (!validationResult.valid) {
      setErrors((prev) => ({ ...prev, [name]: validationResult.message }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, []);

  const handleBlur = useCallback(
    (name, value, formData) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      validateField(name, value, formData);
    },
    [validateField]
  );

  const validateForm = useCallback((formData) => {
    console.log("data");
    const { isValid, errors } = validateProfileForm(formData);
    setErrors(errors);
    return isValid;
  }, []);

  return {
    errors,
    touched,
    validateField,
    handleBlur,
    validateForm,
    setTouched,
  };
};
