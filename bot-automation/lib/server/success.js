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
};
