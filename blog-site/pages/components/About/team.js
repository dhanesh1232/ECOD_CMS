"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaX,
  FaGlobe,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";
import { SiBehance, SiDribbble } from "react-icons/si";

const socialIcons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  website: FaGlobe,
  github: FaGithub,
  youtube: FaYoutube,
  behance: SiBehance,
  dribbble: SiDribbble,
  x: FaX,
};

const TeamMemberCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!data)
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse h-[300px] w-full"></div>
    );

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return (
          <FaStar key={i} className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
        );
      } else if (rating >= starValue - 0.5) {
        return (
          <FaStarHalfAlt
            key={i}
            className="text-yellow-400 w-4 h-4 md:w-5 md:h-5"
          />
        );
      }
      return (
        <FaRegStar key={i} className="text-gray-300 w-4 h-4 md:w-5 md:h-5" />
      );
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col"
        onClick={() => setIsOpen(true)}
      >
        <div className="text-center flex flex-col items-center flex-grow">
          {/* Profile Image with Expertise Ring */}
          <div className="relative mb-4">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(#3b82f6 ${data.expertise_percentage}%, #e5e7eb ${data.expertise_percentage}%)`,
                padding: "4px",
              }}
            >
              <div className="relative h-full w-full rounded-full bg-white p-1">
                {data.image_url ? (
                  <Image
                    src={data.image_url}
                    alt={data.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover aspect-square"
                    priority={false}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-2xl font-bold">
                    {data.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <div className="h-24 w-24"></div> {/* Spacer */}
          </div>

          {/* Name & Role */}
          <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {data.name}
          </h3>
          <p className="mt-1 text-gray-600 text-sm font-medium">{data.role}</p>

          {/* Star Rating */}
          <div className="flex mt-2 space-x-0.5">
            {renderStars(data.rating)}
            <span className="text-xs text-gray-500 ml-1">({data.rating})</span>
          </div>

          {/* Social Links */}
          {data.social?.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
              {data.social.map((each, ind) => {
                const IconComponent = socialIcons[each.icon.toLowerCase()];
                return (
                  <Link
                    key={ind}
                    href={each.slug}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-500 hover:text-blue-600 transition-colors p-1"
                    aria-label={`${data.name}'s ${each.icon}`}
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Popup Modal */}
      <AnimatePresence>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setIsOpen(false)}
            static
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition transform"
                      aria-label="Close"
                    >
                      <FaX className="w-5 h-5 text-gray-500 " />
                    </button>

                    <div className="p-8 text-center">
                      {/* Profile Image with Expertise Ring */}
                      <div className="relative w-full mx-auto mb-6 flex items-center justify-center">
                        <div
                          className="w-20 h-20 inset-0 rounded-full flex items-center justify-center"
                          style={{
                            background: `conic-gradient(#3b82f6 ${data.expertise_percentage}%, #e5e7eb ${data.expertise_percentage}%)`,
                          }}
                        >
                          <div className="relative h-[4.8rem] w-[4.8rem] rounded-full bg-white p-1">
                            {data.image_url ? (
                              <Image
                                src={data.image_url}
                                alt={data.name}
                                width={128}
                                height={128}
                                className="rounded-full object-cover aspect-square"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-4xl font-bold">
                                {data.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Dialog.Title className="text-2xl font-bold text-gray-900">
                        {data.name}
                      </Dialog.Title>
                      <Dialog.Description className="text-gray-600 text-lg mt-1">
                        {data.role}
                      </Dialog.Description>

                      {/* Expertise Meter */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Expertise Level</span>
                          <span className="font-semibold text-blue-600">
                            {data.expertise_percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${data.expertise_percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex justify-center mt-4 space-x-1">
                        {renderStars(data.rating)}
                      </div>

                      {/* Description */}
                      <p className="mt-4 text-gray-700 text-left">
                        {data.description}
                      </p>

                      {/* Social Links */}
                      {data.social?.length > 0 && (
                        <div className="flex justify-center gap-4 mt-6">
                          {data.social.map((each, ind) => {
                            const IconComponent =
                              socialIcons[each.icon.toLowerCase()];
                            return (
                              <Link
                                key={ind}
                                href={each.slug}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                                aria-label={`${data.name}'s ${each.icon}`}
                              >
                                {IconComponent && (
                                  <IconComponent className="w-5 h-5" />
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </AnimatePresence>
    </>
  );
};

export default TeamMemberCard;
