import { CiDark, CiLight } from "react-icons/ci";

import { useState } from "react";
import Logo from "./Logo";
import UserMenu from "./userMenu";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className=" flex justify-between p-4 border-b border-gray-400 items-center">
      <Logo />

      <div>
        <UserMenu />
      </div>

      {/* <div
        onClick={toggleDarkMode}
        className="border p-1 border-blue-800 rounded-lg bg-blue-800 cursor-pointer"
      >
        {isDarkMode ? (
          <div>
            <CiDark className="text-2xl" />
          </div>
        ) : (
          <div>
            <CiLight className="text-2xl" />
          </div>
        )}
      </div> */}
    </div>
  );
}
