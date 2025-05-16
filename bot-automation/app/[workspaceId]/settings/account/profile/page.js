"use client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiUpload,
  FiCheck,
  FiX,
  FiShield,
  FiUser,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast-provider";
import { motion } from "framer-motion";
import { CheckmarkIcon } from "react-hot-toast";

const AccountInfoSection = () => {
  const showToast = useToast();
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [activePlan, setActivePlan] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: "",
    fullName: "",
    email: "",
    phone: "",
    isVerified: false,
  });
  const [tempData, setTempData] = useState({ ...formData });
  const [imagePreview, setImagePreview] = useState(formData.profilePicture);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/profile/user-info", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const res_data = await res.json();
          console.log(res_data);
          const data = res_data?.user;
          const existPlan = res_data.existPlan;
          setActivePlan(existPlan);
          setFormData({
            profilePicture: data.image || "",
            fullName: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            isVerified: data.isVerified || false,
          });
          setTempData({
            profilePicture: data.image || "",
            fullName: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
          });
          setImagePreview(data.image || "");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        showToast({
          title: "Error",
          description: "Failed to load user data",
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [showToast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setTempData((prev) => ({ ...prev, phone: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        showToast({
          title: "Image too large",
          description: "Image must be smaller than 2MB",
          variant: "error",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result);
        setTempData((prev) => ({
          ...prev,
          profilePicture: event.target?.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!tempData.fullName.trim()) {
      showToast({
        title: "Validation Error",
        description: "Full Name is required",
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          image: tempData.profilePicture,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to update profile");
      }

      setFormData({ ...tempData });
      setImagePreview(tempData.profilePicture);
      setIsEditing(false);
      showToast({
        title: "Success",
        description: "Profile updated successfully",
        variant: "success",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempData({ ...formData });
    setImagePreview(formData.profilePicture);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-auto transition-all border border-gray-100 dark:border-gray-800"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Account Information
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition hover:shadow-md"
          >
            <FiEdit2 size={16} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <FiX size={16} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition hover:shadow-md disabled:opacity-70"
            >
              <FiCheck size={16} /> {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative group">
            <div className="md:w-32 w-20 h-20 md:h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-800 shadow-lg">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 transition transform hover:scale-105">
                <FiUpload className="text-white" size={18} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {isEditing && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
              JPG, PNG (Max 2MB)
            </p>
          )}
        </div>

        {/* Form Section */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FiUser size={16} className="text-indigo-600" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={tempData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border dark:border-gray-700">
                  {formData.fullName || "Not provided"}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FiMail size={16} className="text-indigo-600" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={tempData.email}
                  readOnly
                  disabled
                  className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 cursor-not-allowed opacity-80"
                />
                {formData.isVerified && (
                  <span className="absolute right-3 top-3 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded">
                    <CheckmarkIcon size={14} />
                  </span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FiPhone size={16} className="text-indigo-600" />
                Phone Number
              </label>
              <div className="custom-phone-input-container">
                <PhoneInput
                  international
                  readOnly={!isEditing}
                  disabled={!isEditing}
                  defaultCountry="IN"
                  value={tempData.phone}
                  onChange={handlePhoneChange}
                  className={`custom-phone-input w-full rounded-lg border dark:border-gray-700 ${
                    isEditing
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Details Section */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border border-indigo-100 dark:border-gray-700">
        <div className="flex justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <FiShield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {activePlan.plan}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activePlan.description || "Basic features"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {activePlan.status === "active" ? (
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                Active
              </span>
            ) : (
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium">
                Inactive
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                router.push(`/${workspaceId}/settings/account/billing`)
              }
              className="px-4 py-2 hidden rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition lg:flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            router.push(`/${workspaceId}/settings/account/billing`)
          }
          className="px-4 py-2 lg:hidden w-full justify-center rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm"
        >
          Upgrade Plan
        </button>
      </div>
    </motion.div>
  );
};

export default AccountInfoSection;
