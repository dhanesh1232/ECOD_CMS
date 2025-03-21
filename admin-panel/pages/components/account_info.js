import { motion } from "framer-motion";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Pen, Save, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaInstagram,
  FaFacebook,
  FaDiscord,
} from "react-icons/fa";

const icons = {
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  github: FaGithub,
  twitter: FaTwitter,
  portfolio: FaGlobe,
  facebook: FaFacebook,
  discord: FaDiscord,
};

const AccountInfo = React.memo(({ slideClose }) => {
  const { data: session, status, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempUserData, setTempUserData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    skills: "",
    expertize: 0,
    rating: 0,
    socialLinks: {
      linkedin: "",
      github: "",
      facebook: "",
      twitter: "",
      instagram: "",
      discord: "",
      portfolio: "",
    },
  });

  const user = session?.user;

  // Fetch user data from MongoDB
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.email) {
        try {
          const response = await fetch(`/api/profile?email=${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setTempUserData({
              name: data.name || "",
              email: data.email || "",
              bio: data.bio || "",
              location: data.location || "",
              skills: data.skills?.join(", ") || "",
              expertize: data.expertize || 0,
              rating: data.rating || 0,
              socialLinks: data.socialLinks || {
                linkedin: "",
                github: "",
                facebook: "",
                twitter: "",
                instagram: "",
                discord: "",
                portfolio: "",
              },
            });
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleInputChange = useCallback((field, value) => {
    setTempUserData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSocialLinkChange = useCallback((platform, value) => {
    setTempUserData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  }, []);

  const saveChanges = useCallback(async () => {
    if (!user?.email) {
      console.error("User email is missing");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          ...tempUserData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile updated successfully:", data);

        // Update the session with the new data
        await update({
          ...session,
          user: {
            ...session.user,
            ...tempUserData, // Update session with the new data
          },
        });

        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, [tempUserData, user, session, update]);
  const socialLinks = useMemo(() => Object.keys(icons), []);

  if (status === "unauthenticated") {
    return <p>You need to sign in to update your profile.</p>;
  }
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-y-scroll absolute right-0 top-14 bg-white w-3/5 sm:w-2/5 md:w-2/5 lg:w-1/4 shadow-xl flex flex-col items-center justify-between h-[92dvh] py-2 rounded-lg"
    >
      <div className="w-full text-center">
        <div className="flex justify-between items-center px-2 relative">
          <h1 className="text-gray-700 font-semibold text-lg">User Profile</h1>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="h-6 w-6 flex items-center justify-center font-bold text-gray-600 hover:text-gray-800"
          >
            <Pen size={16} />
          </button>
          {isEditing && (
            <div className="absolute left-0 bg-white w-full flex items-center justify-between px-2 overflow-hidden">
              <button
                className=""
                type="button"
                onClick={() => setIsEditing(false)}
              >
                <X size={18} className="text-gray-800 hover:text-gray-900" />
              </button>
              <button type="button" onClick={saveChanges} disabled={isLoading}>
                <Save size={18} className="text-gray-800 hover:text-gray-900" />
              </button>
            </div>
          )}
        </div>
        <hr className="mt-1" />
      </div>

      {user ? (
        <>
          <div className="flex flex-col items-center my-2 w-full px-6 gap-1">
            <div className="h-20 w-20 border-4 border-gray-300 rounded-full">
              <Image
                src={user.image || "/male.png"}
                alt="User Profile"
                width={80}
                height={80}
                className="w-18 h-18 rounded-full"
              />
            </div>

            {isEditing ? (
              <input
                type="text"
                value={tempUserData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="border p-1 w-full text-center rounded focus:outline-none"
              />
            ) : (
              <p className="text-gray-900 text-lg font-medium">{user.name}</p>
            )}
            {isEditing ? (
              <input
                type="email"
                value={tempUserData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border p-1 w-full text-center rounded focus:outline-none"
              />
            ) : (
              <p className="text-lg font-medium text-gray-500">{user.email}</p>
            )}
          </div>

          {/* Editable Fields */}
          <div className="w-full flex flex-col items-center gap-2 py-4 px-4">
            {["bio", "location", "skills", "expertize", "rating"].map(
              (field) => (
                <div key={field} className="w-full">
                  <label className="text-sm text-gray-600 capitalize">
                    {field}
                  </label>
                  <div className="flex items-center w-full justify-between gap-1">
                    {isEditing ? (
                      <input
                        type={
                          field === "expertize" || field === "rating"
                            ? "range"
                            : "text"
                        }
                        min={0}
                        max={field === "rating" ? 5 : 100}
                        step={field === "rating" ? 0.5 : 1}
                        value={tempUserData[field]}
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                        readOnly={!isEditing}
                        className="border p-1 rounded focus:outline-none w-full"
                      />
                    ) : (
                      <p>{tempUserData[field]}</p>
                    )}

                    {(field === "expertize" || field === "rating") && (
                      <input
                        type="number"
                        min={0}
                        max={field === "rating" ? 5 : 100}
                        step={field === "rating" ? 0.5 : 1}
                        onChange={(e) =>
                          handleInputChange(field, e.target.value)
                        }
                        className="p-2 w-12 h-8 border-2 ring-0 focus:ring-0 focus:outline-none rounded flex items-center justify-center"
                        value={tempUserData[field]}
                        readOnly={!isEditing}
                      />
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Social Links */}
          <div className="w-full flex flex-col items-center gap-1 px-4">
            {socialLinks.map((platform) => {
              const IconComponent = icons[platform];
              const url = tempUserData.socialLinks[platform] || "";

              return (
                <div key={platform} className="w-full flex items-center gap-2">
                  {url && !isEditing && (
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      <IconComponent
                        className="text-gray-600 hover:text-gray-800"
                        size={20}
                      />
                    </Link>
                  )}

                  {(isEditing || !url) && (
                    <input
                      type="text"
                      value={url}
                      placeholder={`Enter ${platform} URL`}
                      onChange={(e) =>
                        handleSocialLinkChange(platform, e.target.value)
                      }
                      readOnly={!isEditing}
                      className="border p-1 w-full rounded focus:outline-none"
                    />
                  )}

                  {isEditing && url && (
                    <button
                      type="button"
                      onClick={() => handleSocialLinkChange(platform, "")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No user data available</p>
      )}

      <div className="flex items-center justify-around w-full py-3">
        <button
          onClick={slideClose}
          className="bg-gray-600 text-white w-2/5 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
        >
          Close
        </button>
        <button
          onClick={() => signOut()}
          className="bg-red-600 text-white w-2/5 py-2 rounded-lg hover:bg-red-800 transition-all duration-300"
        >
          Sign Out
        </button>
      </div>
    </motion.div>
  );
});

export default AccountInfo;
