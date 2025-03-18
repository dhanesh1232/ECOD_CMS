"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const icons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const TeamMemberCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!data) return <p>Loading....</p>;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="text-center flex flex-col items-center">
          <div
            className="relative flex justify-center items-center rounded-full h-[70px] w-[70px]"
            style={{
              background: `conic-gradient(#3b82f6 ${data.expertise_percentage}%, #e5e7eb ${data.expertise_percentage}%)`,
            }}
          >
            <div className="flex justify-center items-center rounded-full bg-white h-16 w-16 shadow-md">
              {data.image_url ? (
                <Image
                  src={data.image_url}
                  alt={data.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="text-gray-700 text-xl font-bold">
                  {data.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name & Role */}
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            {data.name}
          </h3>
          <p className="mt-1 text-gray-600 text-base font-bold">{data.role}</p>

          {/* Star Rating */}
          <div className="flex mt-2">{renderStars(data.rating)}</div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {data.social.map((each, ind) => {
              const IconComponent = icons[each.icon.toLowerCase()];
              return (
                <Link
                  key={ind}
                  href={each.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-xl text-gray-600 hover:text-blue-600 transition">
                    {IconComponent && <IconComponent className="text-xl" />}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Popup Modal */}
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center px-6 md:px-0 z-50"
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            <div className="text-center">
              <div
                className="relative flex justify-center items-center rounded-full h-24 w-24 mx-auto mb-4"
                style={{
                  background: `conic-gradient(#3b82f6 ${data.expertise_percentage}%, #e5e7eb ${data.expertise_percentage}%)`,
                }}
              >
                <div className="flex justify-center items-center rounded-full bg-white h-20 w-20 shadow-md">
                  {data.image_url ? (
                    <Image
                      src={data.image_url}
                      alt={data.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="text-gray-700 text-2xl font-bold">
                      {data.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
              <p className="text-gray-600 text-lg">{data.role}</p>

              {/* Expertise Percentage */}
              <p className="mt-2 text-blue-600 font-semibold">
                Expertise: {data.expertise_percentage}%
              </p>

              {/* Star Rating */}
              <div className="flex justify-center mt-2 text-2xl">
                {renderStars(data.rating)}
              </div>

              {/* Description */}
              <p className="mt-3 text-gray-700">{data.description}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-4">
                {data.social.map((each, ind) => {
                  const IconComponent = icons[each.icon.toLowerCase()];
                  return (
                    <Link
                      key={ind}
                      href={each.slug}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-2xl text-gray-600 hover:text-blue-600 transition">
                        {IconComponent && <IconComponent className="text-xl" />}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </Dialog>
      )}
    </>
  );
};

export default TeamMemberCard;
