import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDateInput = ({ date, handleChange }) => {
  const [startDate, setStartDate] = useState(new Date(date));

  return (
    <div className="relative w-full z-50">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          handleChange("updated_date", date.toISOString().split("T")[0]);
        }}
        dateFormat="yyyy-MM-dd"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 10], // Adjust the vertical offset if needed
            },
          },
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              tether: false,
              altAxis: true,
            },
          },
        ]}
        className="w-full px-4 py-2 text-base text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
      />
    </div>
  );
};

export default CustomDateInput;
