import ReactCalendar from "react-calendar";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or your preferred icon library

const Calendar = ({
  className,
  onSelect,
  selected,
  minDate,
  maxDate,
  tileClassName,
  tileDisabled,
  ...props
}) => {
  return (
    <div
      className={`rounded-xl border shadow-sm dark:border-gray-700 ${className}`}
    >
      <ReactCalendar
        onChange={onSelect}
        value={selected}
        className="!border-0 p-2 w-full max-w-xs md:max-w-sm dark:!bg-gray-800 !text-gray-950 dark:!text-gray-100 !bg-white"
        navigationLabel={({ date, label }) => (
          <span className="text-sm font-medium dark:text-gray-200 text-gray-800">
            {label}
          </span>
        )}
        prevLabel={
          <div className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ChevronLeft className="w-5 h-5 dark:text-gray-300 text-gray-600" />
          </div>
        }
        nextLabel={
          <div className="flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ChevronRight className="w-5 h-5 dark:text-gray-300 text-gray-600" />
          </div>
        }
        prev2Label={null}
        next2Label={null}
        minDate={minDate}
        maxDate={maxDate}
        tileDisabled={tileDisabled}
        tileClassName={({ date, view }) => [
          "!rounded-lg !p-2 !text-sm",
          selected && date.toDateString() === selected.toDateString()
            ? "!bg-blue-500 !text-white"
            : "hover:!bg-gray-100 dark:hover:!bg-gray-700",
          tileClassName && tileClassName({ date, view }),
        ]}
        formatShortWeekday={(locale, date) =>
          ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
        }
        navigationAriaLabel="Navigate between months"
        showNeighboringMonth={false}
        {...props}
      />
    </div>
  );
};

export { Calendar };
