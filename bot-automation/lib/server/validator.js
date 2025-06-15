import { Coupon } from "@/models/payment/coupon";

/**
 * Validates coupon data with comprehensive checks
 * @param {Object} data - Coupon data to validate
 * @param {string} [couponId] - Optional coupon ID for update operations
 * @returns {Object} { valid: boolean, message: string }
 */
export const validateCouponData = async (data, couponId = null) => {
  // Required fields check
  const requiredFields = [
    "title",
    "code",
    "discountType",
    "discountValue",
    "startDate",
    "endDate",
    "usageLimits.total",
    "period",
  ];

  const missingFields = requiredFields.filter((field) => {
    const keys = field.split(".");
    let value = data;
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return true;
    }
    return value === null || value === "";
  });

  if (missingFields.length > 0) {
    return {
      valid: false,
      message: `Missing required fields: ${missingFields.join(", ")}`,
    };
  }

  // Code validation
  if (!/^[A-Z0-9_-]{4,20}$/.test(data.code)) {
    return {
      valid: false,
      message:
        "Coupon code must be 4-20 characters, uppercase alphanumeric with hyphens/underscores",
    };
  }

  // Check for duplicate code (excluding current coupon for updates)
  const existingCoupon = await Coupon.findOne({
    code: data.code.toUpperCase(),
    ...(couponId && { _id: { $ne: couponId } }),
  });

  if (existingCoupon) {
    return {
      valid: false,
      message: "Coupon code already exists",
    };
  }

  // Date validation
  try {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return {
        valid: false,
        message: "Invalid date format",
      };
    }

    if (startDate >= endDate) {
      return {
        valid: false,
        message: "End date must be after start date",
      };
    }

    // Time validation if provided
    if (
      data.startTime &&
      !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.startTime)
    ) {
      return {
        valid: false,
        message: "Invalid start time format (HH:MM)",
      };
    }

    if (
      data.endTime &&
      !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.endTime)
    ) {
      return {
        valid: false,
        message: "Invalid end time format (HH:MM)",
      };
    }
  } catch (err) {
    return {
      valid: false,
      message: "Invalid date values",
    };
  }

  // Discount validation
  if (data.discountType === "percent") {
    if (data.discountValue < 0 || data.discountValue > 100) {
      return {
        valid: false,
        message: "Percentage must be between 0 and 100",
      };
    }
    if (data.maxDiscountAmount && data.maxDiscountAmount < 0) {
      return {
        valid: false,
        message: "Maximum discount amount cannot be negative",
      };
    }
  } else if (data.discountType === "fixed" && data.discountValue < 0) {
    return {
      valid: false,
      message: "Fixed amount cannot be negative",
    };
  }

  // Usage limits validation
  if (data.usageLimits.total < 1) {
    return {
      valid: false,
      message: "Total usage limit must be at least 1",
    };
  }

  if (data.usageLimits.perUser && data.usageLimits.perUser < 1) {
    return {
      valid: false,
      message: "Per user limit must be at least 1 if specified",
    };
  }

  // Min cart value validation
  if (data.minCartValue && data.minCartValue < 0) {
    return {
      valid: false,
      message: "Minimum cart value cannot be negative",
    };
  }

  // Period validation
  const validPeriods = ["monthly", "yearly", "both"];
  if (!validPeriods.includes(data.period)) {
    return {
      valid: false,
      message: "Invalid subscription period",
    };
  }

  // Currency validation for fixed amount coupons
  if (data.discountType === "fixed") {
    const validCurrencies = ["INR", "USD", "EUR", "GBP"];
    if (!validCurrencies.includes(data.currency)) {
      return {
        valid: false,
        message: "Invalid currency",
      };
    }
  }

  return {
    valid: true,
    message: "Coupon data is valid",
  };
};

/**
 * Validates coupon code format
 * @param {string} code - Coupon code to validate
 * @returns {boolean} - True if valid
 */
export const validateCouponCode = (code) => {
  return /^[A-Z0-9_-]{4,20}$/.test(code);
};
