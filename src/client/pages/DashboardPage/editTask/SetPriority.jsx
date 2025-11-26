import { useState } from "react";
import { IoRadioButtonOffOutline, IoRadioButtonOn } from "react-icons/io5";

function SortPriority({ state, setCheck }) {
  const values = [
    { label: "High", value: 3 },
    { label: "Mid", value: 2 },
    { label: "Low", value: 1 },
  ];
  const togglePriorityValues = (value) => {
    setCheck(value);
  };

  const renderedValues = values.map((value) => {
    // console.log(state);
    const checked = state.priority_id === value.value;

    return (
      <div
        onClick={() => togglePriorityValues(value.value)}
        key={value.value}
        className="flex gap-2 items-center cursor-pointer text-blue-700"
      >
        <div>{checked ? <IoRadioButtonOn /> : <IoRadioButtonOffOutline />}</div>
        <div>
          <h2 className="text-blue-500">{value.label}</h2>
        </div>
      </div>
    );
  });

  return (
    <div className="border-b border-gray-200 pb-2 pr-4 ">
      <h2 className="font-semibold text-gray-500">Set Priority</h2>
      <div className="flex gap-4">{renderedValues}</div>
    </div>
  );
}

export default SortPriority;
