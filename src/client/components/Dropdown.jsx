import { useEffect, useRef, useState } from "react";

function Dropdown({ options, placeholder, onSelect, selection, label }) {
  const [isOpen, setIsOpen] = useState(false);

  const divRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleSelectOption = (item) => {
    setIsOpen(false);
    onSelect(item.label);
  };
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderedItems = options.map((item) => {
    return (
      <div
        onClick={() => handleSelectOption(item)}
        key={item.value}
        className="hover:bg-blue-300 hover:text-white cursor-pointer p-2"
      >
        {item.label}
      </div>
    );
  });

  return (
    <div>
      <label className="text-md font-medium text-gray-600">
        {label ? label : "Label"}
      </label>
      <div
        ref={divRef}
        className="relative border border-gray-300 rounded-md p-2 cursor-pointer w-full bg-gray-100 mt-1"
        onClick={handleIsOpen}
      >
        <div>{selection ? selection : placeholder || "Select..."}</div>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-full border border-gray-200 bg-white rounded-md shadow">
            {renderedItems}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
