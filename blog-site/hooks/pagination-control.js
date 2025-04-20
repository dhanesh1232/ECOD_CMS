"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-row justify-between items-center mt-12 gap-4"
    >
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-3 md:px-6 py-1.5 md:py-3 rounded-lg text-sm font-medium transition-all ${
          currentPage === 1
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg"
        }`}
      >
        <MoveLeft className="w-4 h-4" /> Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`md:w-10 w-8 h-8 md:h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        {totalPages > 5 && <span className="px-2 text-gray-500">...</span>}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-3 md:px-6 py-1.5 md:py-3 rounded-lg text-sm font-medium transition-all ${
          currentPage === totalPages
            ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg"
        }`}
      >
        Next <MoveRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
