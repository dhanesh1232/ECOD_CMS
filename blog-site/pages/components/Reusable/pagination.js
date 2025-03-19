import { MoveLeft, MoveRight } from "lucide-react";
import { useCallback } from "react";

const PaginationComponent = ({ prev, next, currentPage, totalPages }) => {
  const handlePrev = useCallback(() => {
    prev();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNext = useCallback(() => {
    next();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="w-full flex justify-center items-center mt-8 space-x-6 sm:space-x-8">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-md text-[12px] sm:text-base font-medium transition-all duration-200 ${
          currentPage === 1
            ? "bg-gray-500 dark:bg-gray-700 text-gray-300 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-500 hover:scale-110"
        }`}
      >
        <MoveLeft className="w-4 sm:w-5 h-4 sm:h-5" /> Prev
      </button>

      {/* Page Indicator */}
      <span className="px-3 py-2 text-[12px] sm:text-base text-gray-900 dark:text-gray-200 font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-md text-[12px] sm:text-base font-medium transition-all duration-200 ${
          currentPage === totalPages
            ? "bg-gray-500 dark:bg-gray-700 text-gray-300 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-500 hover:scale-110"
        }`}
      >
        Next <MoveRight className="w-4 sm:w-5 h-4 sm:h-5" />
      </button>
    </div>
  );
};

export default PaginationComponent;
