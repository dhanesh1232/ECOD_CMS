import { NextResponse } from "next/server";
const headers = { "Content-Type": "application/json" };
const createSuccessResponse = (status = 200, message = "", data = {}) => {
  return NextResponse.json({ ...data, message }, { status, headers });
};
export const SuccessHandle = {
  UserProfile: (data, message = "") => {
    return createSuccessResponse(200, message, data);
  },
  UserProfileUpdate: (message = "Profile updated successfully") => {
    return createSuccessResponse(200, message);
  },
  UserNotificationHandle: (
    data,
    message = "Notification Preference chnaged"
  ) => {
    return createSuccessResponse(200, message, data);
  },
  DefaultSuccess: (message = "API Success") => {
    return createSuccessResponse(200, message);
  },

  //subscription create
  createSub: (data, message = "Successfully plan created, finish payment") => {
    return createSuccessResponse(200, message, data);
  },
  couponValidationSuccess: (data, message) => {
    return createSuccessResponse(200, message, data);
  },
  SubscriptionSuccess: (
    data,
    message = "Subscription verified successfully"
  ) => {
    return createSuccessResponse(200, message, data);
  },
  SubscriptionHistory: (data) => {
    return NextResponse.json(data, { status: 200, headers });
  },

  /// Admin Panel
  PlansSuccessFetch: (data, message = "Plans fetched successfully") => {
    return createSuccessResponse(200, message, data);
  },
  PlanIdFetch: (data, message = "Plan Id fetched successfully") => {
    return createSuccessResponse(200, message, data);
  },
  SubscriptionsDataSuccess: (
    data,
    message = "Subscriptions fetched successfully"
  ) => {
    return createSuccessResponse(200, message, data);
  },
};
