import * as React from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ChevronIcon = ({ direction = "left" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
    />
  </svg>
);

const Calendar = ({ className, onSelect, selected, ...props }) => {
  return (
    <div className={`rounded-md border ${className}`}>
      <ReactCalendar
        onChange={onSelect}
        value={selected}
        className="border-0"
        navigationLabel={({ date, label, locale, view }) => label}
        prevLabel={<ChevronIcon direction="left" />}
        nextLabel={<ChevronIcon direction="right" />}
        prev2Label={null}
        next2Label={null}
        {...props}
      />
    </div>
  );
};

export { Calendar };
