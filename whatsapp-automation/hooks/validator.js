import { useState, useCallback } from "react";

export const usePasswordValidator = (options = {}) => {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecialChar = true,
  } = options;

  const [strength, setStrength] = useState({
    strength: "Empty",
    percentage: 0,
  });
  const [requirements, setRequirements] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = useCallback(
    (password) => {
      if (!password || password.length === 0) {
        return {
          strength: "Empty",
          percentage: 0,
          requirements: {
            minLength: false,
            uppercase: false,
            lowercase: false,
            number: false,
            specialChar: false,
          },
        };
      }

      const newRequirements = {
        minLength: password.length >= minLength,
        uppercase: requireUppercase ? /[A-Z]/.test(password) : true,
        lowercase: requireLowercase ? /[a-z]/.test(password) : true,
        number: requireNumber ? /[0-9]/.test(password) : true,
        specialChar: requireSpecialChar ? /[^A-Za-z0-9]/.test(password) : true,
      };

      const metRequirements =
        Object.values(newRequirements).filter(Boolean).length;
      const totalRequirements = Object.keys(newRequirements).length;
      const percentage = (metRequirements / totalRequirements) * 100;

      let strengthLabel;
      if (percentage === 0) strengthLabel = "Empty";
      else if (percentage <= 25) strengthLabel = "Very Weak";
      else if (percentage <= 50) strengthLabel = "Weak";
      else if (percentage <= 75) strengthLabel = "Good";
      else strengthLabel = "Strong";

      return {
        strength: strengthLabel,
        percentage,
        requirements: newRequirements,
      };
    },
    [
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSpecialChar,
    ]
  );

  const updatePassword = useCallback(
    (password) => {
      const validation = validatePassword(password);
      setStrength({
        strength: validation.strength,
        percentage: validation.percentage,
      });
      setRequirements(validation.requirements);
    },
    [validatePassword]
  );

  const getRequirementStatus = useCallback(
    (requirement) => {
      return requirements[requirement] || false;
    },
    [requirements]
  );

  return {
    passwordStrength: strength,
    getRequirementStatus,
    updatePassword,
  };
};
