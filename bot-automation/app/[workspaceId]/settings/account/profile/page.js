"use client";
import imageCompression from "browser-image-compression";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast-provider";
import { motion } from "framer-motion";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  FiEdit2,
  FiUpload,
  FiCheck,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
} from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";
import { useMobileRange } from "@/hooks/mediaQuery";
import { UserServices } from "@/lib/client/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserIcon, VerifiedBadge } from "@/public/Images/svg_ecod";

const AccountInfoSection = () => {
  const isTinyMobile = useMobileRange();
  const showToast = useToast();
  const router = useRouter();
  const params = useParams();
  const workspaceId = params.workspaceId;
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    profilePicture: "",
    fullName: "",
    email: "",
    phone: "",
    isVerified: false,
  });
  const [tempData, setTempData] = useState({ ...userData });
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [imagePreview, setImagePreview] = useState(userData.profilePicture);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState(null);
  const cropperRef = useRef(null);
  const toastRef = useRef(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const res = await UserServices.fetchUserProfile();
        if (res.status && !res.ok) {
          if (!toastRef.current) {
            showToast({
              description: "Failed to fetch user profile",
              variant: "warning",
            });
            toastRef.current = true;
          }
        } else {
          console.log(res);
          const { user, currentWorkspace, workspaces } = res.data;

          setUserData({
            profilePicture: user.image || "",
            fullName: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            isVerified: user.isVerified || false,
          });
          setTempData({
            profilePicture: user.image || "",
            fullName: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
          });
          setImagePreview(user.image || "");
          setWorkspaces(workspaces);
          setCurrentWorkspace(currentWorkspace);
        }
      } catch (error) {
        if (!toastRef.current) {
          showToast({
            title: "Error",
            description: error.message || "Failed to load user data",
            variant: "warning",
          });
          toastRef.current = true;
        }
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

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB

      if (file.size > MAX_SIZE) {
        if (!toastRef.current) {
          showToast({
            title: "Image too large",
            description: "Image must be smaller than 5MB",
            variant: "warning",
          });
          toastRef.current = true;
        }
        return;
      }

      try {
        // First create a preview URL for the cropper
        const imageUrl = URL.createObjectURL(file);
        setOriginalImage(imageUrl);
        setShowCropper(true);
      } catch (error) {
        if (!toastRef.current) {
          showToast({
            title: "Error",
            description: "Could not process the image. Try another file.",
            variant: "warning",
          });
          toastRef.current = true;
        }
      }
    }
  };

  const handleCrop = async () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const cropperInstance = cropperRef.current.cropper;
      try {
        // Get the cropped canvas
        const canvas = cropperInstance.getCroppedCanvas({
          width: 512,
          height: 512,
          minWidth: 256,
          minHeight: 256,
          maxWidth: 1024,
          maxHeight: 1024,
          fillColor: "#fff",
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high",
        });

        if (!canvas) {
          if (!toastRef.current) {
            showToast({
              description: "Could not get cropped canvas",
              variant: "warning",
            });
            toastRef.current = true;
          }
        }

        // Convert canvas to blob
        canvas.toBlob(
          async (blob) => {
            try {
              // Compress the blob
              const options = {
                maxSizeMB: 1, // Compress to ~1MB
                maxWidthOrHeight: 1024,
                useWebWorker: true,
              };
              const compressedFile = await imageCompression(blob, options);
              const compressedBase64 =
                await imageCompression.getDataUrlFromFile(compressedFile);

              setImagePreview(compressedBase64);
              setTempData((prev) => ({
                ...prev,
                profilePicture: compressedBase64,
              }));
              setShowCropper(false);
              URL.revokeObjectURL(originalImage); // Clean up
            } catch (error) {
              if (!toastRef.current) {
                showToast({
                  title: "Error",
                  description: "Could not process the image. Try another file.",
                  variant: "warning",
                });
                toastRef.current = true;
              }
            }
          },
          "image/jpeg",
          0.8
        ); // 80% quality
      } catch (error) {
        if (!toastRef.current) {
          showToast({
            title: "Error",
            description: "Could not crop the image. Try again.",
            variant: "warning",
          });
          toastRef.current = true;
        }
      }
    } else {
      if (!toastRef.current) {
        showToast({
          title: "Error",
          description: "Cropper not initialized. Please try again.",
          variant: "warning",
        });
        toastRef.current = true;
      }
    }
  };

  const handleSave = async () => {
    if (!tempData.fullName.trim()) {
      if (!toastRef.current) {
        showToast({
          title: "Validation Error",
          description: "Full Name is required",
          variant: "warning",
        });
        toastRef.current = true;
      }
      return;
    }

    try {
      const res = await UserServices.updateUserProfile({
        image: tempData.profilePicture,
        name: tempData.fullName,
        phone: tempData.phone,
      });

      if (res.status && !res.ok) {
        const errorData = await res.json();
        if (!toastRef.current) {
          showToast({
            description: errorData.message || "Failed to update profile",
            variant: "warning",
          });
          toastRef.current = true;
        }
      }

      setUserData({ ...tempData });
      setImagePreview(tempData.profilePicture);
      setIsEditing(false);
      if (!toastRef.current) {
        showToast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "success",
        });
        toastRef.current = true;
      }
    } catch (error) {
      if (!toastRef.current) {
        showToast({
          title: "Error",
          description: error.message || "Failed to update profile",
          variant: "warning",
        });
        toastRef.current = true;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempData({ ...userData });
    setImagePreview(userData.profilePicture);
    setIsEditing(false);
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
    }
  };

  const cancelCrop = () => {
    setShowCropper(false);
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
    }
  };
  const switchWorkspace = (workspaceId) => {
    router.push(`/${workspaceId}`);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-auto transition-all border border-gray-100 dark:border-gray-800"
    >
      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-4 max-h-[90vh] overflow-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Crop your profile picture
            </h3>
            <div className="w-full h-64 md:h-96 mb-4">
              <Cropper
                ref={cropperRef}
                src={originalImage}
                style={{ height: "100%", width: "100%" }}
                aspectRatio={1}
                viewMode={1}
                guides={true}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                background={false}
                responsive={true}
                autoCropArea={0.8}
                checkOrientation={false}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelCrop}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCrop}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Crop & Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2
          className={`${
            isTinyMobile ? "text-base" : "text-lg"
          } sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white`}
        >
          Account Information
        </h2>
        {!isEditing ? (
          <EditButton
            onClick={() => setIsEditing(true)}
            isTinyMobile={isTinyMobile}
          />
        ) : (
          <EditControls
            onCancel={handleCancel}
            onSave={handleSave}
            isLoading={isLoading}
            isTinyMobile={isTinyMobile}
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <ProfilePictureSection
          verified={userData.isVerified}
          imagePreview={imagePreview}
          isEditing={isEditing}
          onImageChange={handleImageChange}
        />

        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            <FormField
              label="Email Address"
              icon={<FiMail size={16} className="text-indigo-600" />}
              isEditing={false}
            >
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={tempData.email || ""}
                  readOnly
                  disabled
                  className="w-full p-2 text-sm md:p-3 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 opacity-80"
                />
              </div>
            </FormField>
            <FormField
              label="Full Name"
              icon={<FiUser size={16} className="text-indigo-600" />}
              isEditing={isEditing}
            >
              {isEditing ? (
                <Input
                  type="text"
                  name="fullName"
                  value={tempData.fullName || ""}
                  onChange={handleInputChange}
                  className={`w-full p-2 md:p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="bg-gray-50 dark:bg-gray-800 text-sm p-2 md:p-3 rounded-lg border dark:border-gray-700">
                  {userData.fullName || "Not provided"}
                </p>
              )}
            </FormField>
            <FormField
              label="Phone Number"
              icon={<FiPhone size={16} className="text-indigo-600" />}
              isEditing={isEditing}
            >
              <div className="custom-phone-input-container">
                <PhoneInput
                  international
                  readOnly={!isEditing}
                  disabled={!isEditing}
                  defaultCountry="IN"
                  value={tempData.phone}
                  onChange={handlePhoneChange}
                  className={`custom-phone-input w-full text-sm rounded-lg border dark:border-gray-700 ${
                    isEditing
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  }`}
                />
              </div>
            </FormField>
            <FormField
              label="Current Workspace"
              icon={<FiBriefcase size={16} className="text-indigo-600" />}
              isEditing={false}
            >
              <p className="bg-gray-50 dark:bg-gray-800 text-sm p-2 md:p-3 rounded-lg border dark:border-gray-700">
                {currentWorkspace
                  ? workspaces.find((ws) => ws.id === currentWorkspace)?.name
                  : "No active workspace"}
              </p>
            </FormField>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Your Workspaces
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              isCurrent={workspace.id === currentWorkspace}
              onClick={() => switchWorkspace(workspace.id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WorkspaceCard = ({ workspace, isCurrent, onClick }) => {
  const planColors = {
    free: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    basic:
      "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    pro: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    enterprise:
      "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`p-4 rounded-lg border transition-all cursor-pointer ${
        isCurrent
          ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10 dark:border-indigo-700"
          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white">
          {workspace.name}
        </h4>
        {isCurrent && (
          <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
            Current
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            planColors[workspace.subscription.plan] || planColors.free
          }`}
        >
          {workspace.subscription.plan.charAt(0).toUpperCase() +
            workspace.subscription.plan.slice(1)}
        </span>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">{workspace.role}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Sub-components for better organization
const LoadingSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="flex-1 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-auto transition-all border border-gray-100 dark:border-gray-800"
  >
    <div className="flex justify-between items-center mb-6">
      <Skeleton className="h-8 w-48 rounded-lg" />
      <Skeleton className="h-10 w-24 rounded-lg" />
    </div>

    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col items-center lg:items-start">
        <Skeleton className="w-32 h-32 rounded-full" />
        <Skeleton className="mt-3 h-4 w-32 rounded-md" />
      </div>

      <div className="flex-1 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-8 p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-4 w-48 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  </motion.div>
);

const EditButton = ({ onClick, isTinyMobile }) => (
  <Button
    rounded="lg"
    onClick={onClick}
    className={`flex items-center gap-2 ${
      isTinyMobile ? "px-2 py-2 text-xs" : "px-4 py-2 text-sm"
    } font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition hover:shadow-md`}
  >
    <FiEdit2 size={isTinyMobile ? 14 : 16} /> Edit
  </Button>
);

const EditControls = ({ onCancel, onSave, isLoading, isTinyMobile }) => (
  <div className="flex gap-2 mt-0 justify-end">
    <Button
      variant="destructive"
      rounded="lg"
      onClick={onCancel}
      className={`flex items-center gap-1.5 ${
        isTinyMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      } font-medium shadow-sm hover:shadow-xs`}
    >
      <FiX size={isTinyMobile ? 14 : 16} />
      {!isTinyMobile && "Cancel"}
    </Button>
    <Button
      rounded="lg"
      variant="premium"
      onClick={onSave}
      disabled={isLoading}
      className={`flex items-center gap-1.5 ${
        isTinyMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"
      } font-medium shadow-sm hover:shadow-xs disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <>
          <Spinner />
          {!isTinyMobile && "Saving..."}
        </>
      ) : (
        <>
          <FiCheck size={isTinyMobile ? 14 : 16} />
          {!isTinyMobile && "Save"}
        </>
      )}
    </Button>
  </div>
);

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const ProfilePictureSection = ({
  verified,
  imagePreview,
  isEditing,
  onImageChange,
  isUploading = false, // Added loading state
}) => (
  <div className="flex flex-col items-center space-y-4">
    {/* Profile picture container with enhanced styling */}
    <div className="relative group">
      <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-4 border-white dark:border-gray-800 shadow-lg ring-2 ring-offset-2 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:ring-primary/30">
        {/* Loading overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 rounded-full flex items-center justify-center z-10">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {/* Profile image or default */}
        <div className="h-full w-full overflow-hidden rounded-full flex items-center justify-center relative">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="User profile picture"
              width={144}
              height={144}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full w-full h-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
          )}
        </div>

        {/* Edit badge positioned at bottom right */}
        {isEditing && !isUploading && (
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 z-20 ring-2 ring-white dark:ring-gray-900">
            <label
              htmlFor="profile-upload"
              className="flex items-center justify-center cursor-pointer"
              aria-label="Upload profile picture"
            >
              <FiUpload className="text-white" size={18} />
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
                aria-describedby="file-requirements"
                disabled={isUploading}
              />
            </label>
          </div>
        )}
      </div>
    </div>

    {/* Verification and file info section */}
    <div className="flex flex-col items-center space-y-2">
      {verified && (
        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800/50">
          <VerifiedBadge className="text-green-500 dark:text-green-400" />
          <span className="text-xs font-medium text-green-700 dark:text-green-300">
            Verified Account
          </span>
        </div>
      )}

      {isEditing && (
        <div className="text-center">
          <p
            id="file-requirements"
            className="text-xs text-gray-500 dark:text-gray-400"
          >
            Supports JPG, PNG (Max 5MB)
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
            Recommended: 400×400 pixels
          </p>
        </div>
      )}
    </div>
  </div>
);

const FormField = ({ label, icon, children }) => (
  <div className="space-y-1">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      {icon}
      {label}
    </label>
    {children}
  </div>
);

export default AccountInfoSection;
