"use client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiUpload,
  FiExternalLink,
  FiCheck,
  FiX,
  FiShield,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast-provider";

const AccountInfoSection = () => {
  const showToast = useToast();
  const router = useRouter();
  const [activePlan, setActivePlan] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: "",
    fullName: "",
    email: "",
    phone: "",
    company: "",
    website: "",
  });
  const [tempData, setTempData] = useState({ ...formData });
  const [imagePreview, setImagePreview] = useState(formData.profilePicture);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/profile/user-info", {
          method: "GET",
        });
        if (res.ok) {
          const res_data = await res.json();
          const data = res_data?.user;
          const existPlan = res_data.existPlan;
          setActivePlan(existPlan);
          setFormData({
            profilePicture: data.image || "",
            fullName: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            company: data.company || "",
            website: data.website || "",
          });
          setTempData({
            profilePicture: data.image || "",
            fullName: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            company: data.company || "",
            website: data.website || "",
          });
          setImagePreview(data.image || "");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

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
          description: "Image must be smaller than 2MB",
          title: "Size",
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
      showToast("Full Name is required.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: tempData.profilePicture,
          company: tempData.company,
          website: tempData.website, // Corrected from tempData.company
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Failed to update profile");
      }

      // Update form data only after successful API response
      setFormData({ ...tempData });
      setImagePreview(tempData.profilePicture);
      setIsEditing(false);
      showToast({
        discription: "Profile updated successfully",
        title: "Change",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      showToast(error.message || "Failed to update profile", "error");
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
    <div className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-auto transition-all">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Account Info
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
          >
            <FiEdit2 size={14} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition"
            >
              <FiX size={14} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
            >
              <FiCheck size={14} /> Save
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-4 border-white dark:border-gray-700 shadow-md">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <svg
                    className="w-12 h-12"
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
              <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-indigo-700 transition">
                <FiUpload className="text-white" size={16} />
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
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
              Click to upload
            </p>
          )}
        </div>

        {/* Form */}
        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={tempData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {formData.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={tempData.email}
                readOnly
                disabled
                onChange={handleInputChange}
                className="w-full p-2 rounded-md cursor-not-allowed dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>

              <PhoneInput
                international
                readOnly
                disabled
                defaultCountry="IN"
                value={tempData.phone}
                onChange={handlePhoneChange}
                className="custom-phone-input border cursor-not-allowed outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Company
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={tempData.company}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  {formData.company || "Not provided"}
                </p>
              )}
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Website
            </label>
            {isEditing ? (
              <input
                type="url"
                name="website"
                value={tempData.website}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            ) : formData.website ? (
              <a
                href={formData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                {formData.website}
                <FiExternalLink className="ml-1" size={14} />
              </a>
            ) : (
              <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                Not provided
              </p>
            )}
          </div>
        </div>
      </div>
      <hr className="my-2" />
      {/*Plan Details*/}
      <div className="w-full p-6 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-600/30">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 capitalize dark:text-white flex items-center gap-2">
            <FiShield className="w-6 h-6 text-indigo-600" />
            {activePlan.plan}
          </h3>
          {activePlan.isActive && (
            <span className="px-3 py-1 bg-green-100/30 dark:bg-green-900/20 text-green-600 dark:text-green-300 rounded-full text-sm">
              Active
            </span>
          )}
        </div>

        <div className="flex items-end justify-end">
          <button
            type="button"
            onClick={() => router.push("/settings/account/billing")}
            className="px-4 py-2 rounded-lg hover:bg-indigo-600/20 transition flex items-center gap-2 text-indigo-600 dark:text-indigo-300"
          >
            Know More...
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountInfoSection;
