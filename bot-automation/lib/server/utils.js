/**
 * Calculates the current status of a coupon based on dates and current status
 * @param {Object} start - Start date/time { date: Date, time: string }
 * @param {Object} end - End date/time { date: Date, time: string }
 * @param {string} currentStatus - Current status from database
 * @returns {string} - Calculated status
 */
export const getCouponStatus = (start, end, currentStatus) => {
  // If coupon is manually archived or paused, don't auto-update status
  if (["archived", "paused"].includes(currentStatus)) {
    return currentStatus;
  }

  const now = new Date();
  const startDateTime = new Date(
    `${start.date.toISOString().split("T")[0]}T${start.time}`
  );
  const endDateTime = new Date(
    `${end.date.toISOString().split("T")[0]}T${end.time}`
  );

  if (now < startDateTime) {
    return "upcoming";
  } else if (now > endDateTime) {
    return "expired";
  }
  return "active";
};

/**
 * Formats coupon data for API responses
 * @param {Object} coupon - Raw coupon data from database
 * @returns {Object} - Formatted coupon data
 */
export const formatCouponResponse = (coupon) => {
  if (!coupon) return null;

  return {
    ...coupon,
    startDate: coupon.validity.start.date,
    endDate: coupon.validity.end.date,
    startTime: coupon.validity.start.time,
    endTime: coupon.validity.end.time,
    timezone: coupon.validity.timezone,
    usageLimit: coupon.usageLimits.total,
    perUserLimit: coupon.usageLimits.perUser,
  };
};

/**
 * Calculates usage percentage
 * @param {number} usedCount - Number of times coupon has been used
 * @param {number} totalLimit - Total usage limit
 * @returns {number} - Usage percentage (0-100)
 */
export const calculateUsagePercentage = (usedCount, totalLimit) => {
  if (totalLimit <= 0) return 0;
  return Math.min((usedCount / totalLimit) * 100, 100);
};

/**
 * Generates coupon analytics data
 * @param {Object} coupon - Coupon document
 * @param {Array} redemptions - Array of redemption records
 * @returns {Object} - Analytics data
 */
export const generateCouponAnalytics = (coupon, redemptions) => {
  const now = new Date();
  const startDate = new Date(coupon.validity.start.date);
  const endDate = new Date(coupon.validity.end.date);

  // Calculate days between start and end
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));

  // Group redemptions by day
  const dailyRedemptions = redemptions.reduce((acc, redemption) => {
    const date = new Date(redemption.createdAt).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Calculate average daily redemptions
  const avgDailyRedemptions =
    daysPassed > 0 ? coupon.usageLimits.usedCount / daysPassed : 0;

  // Projected total redemptions
  const projectedTotal = avgDailyRedemptions * totalDays;

  return {
    totalRedemptions: coupon.usageLimits.usedCount,
    remainingRedemptions:
      coupon.usageLimits.total - coupon.usageLimits.usedCount,
    redemptionRate: calculateUsagePercentage(
      coupon.usageLimits.usedCount,
      coupon.usageLimits.total
    ),
    dailyRedemptions,
    avgDailyRedemptions,
    projectedTotal,
    daysPassed,
    totalDays,
  };
};

/**
 * Checks if a coupon is currently active
 * @param {Object} coupon - Coupon document
 * @returns {boolean} - True if coupon is active
 */
export const isCouponActive = (coupon) => {
  if (coupon.status === "archived" || coupon.status === "paused") {
    return false;
  }

  const now = new Date();
  const startDate = new Date(coupon.validity.start.date);
  const endDate = new Date(coupon.validity.end.date);

  return now >= startDate && now <= endDate;
};
