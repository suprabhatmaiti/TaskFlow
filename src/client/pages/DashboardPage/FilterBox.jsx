import { useState } from "react";

function FilterBox({ filters, onChange, onApply }) {
  return (
    <div className="absolute top-10 md:right-0 -translate-x-2/4  ">
      <div className=" w-full  bg-white border border-gray-300 rounded-xl md:p-4 p-2 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter</h2>
        <div className="flex flex-col gap-3 mb-4">
          <label className="text-sm font-medium text-gray-700">
            Date Between
          </label>

          <div className="flex gap-3">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
            />

            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className=" flex gap-2 items-center"></div>
          <button
            onClick={onApply}
            className="border border-blue-400 px-4 py-1 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-900 active:bg-blue-400 cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
