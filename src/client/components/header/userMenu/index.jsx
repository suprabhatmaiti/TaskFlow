import { CgProfile, CgLogOut, CgBell } from "react-icons/cg";
import { FiSettings, FiHelpCircle, FiHeart, FiClock } from "react-icons/fi";
import useAuth from "../../../hook/useAuth";
import { use, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function UserMenu() {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef();
  const navigate = useNavigate();

  const classes =
    "hover:bg-gray-100 px-3 py-2 flex items-center gap-2 cursor-pointer rounded-md transition-all duration-200";

  const handleLogoutClick = async () => {
    await logout();
  };
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!userRef.current?.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const onProfileClick = () => {
    navigate("/profile");
    setUserMenuOpen(false);
  };

  return (
    <div className="relative flex items-center gap-4 text-black " ref={userRef}>
      <CgProfile
        onClick={toggleUserMenu}
        className="size-6 cursor-pointer hover:scale-110 text-blue-600 transition-transform duration-200"
      />

      <div
        className={`${userMenuOpen ? "flex" : "hidden"} absolute right-0 top-8 
              bg-white border border-gray-300 rounded-lg shadow-lg 
              flex-col gap-1 w-52 py-2 transition-all duration-200 z-50`}
      >
        <div className={classes}>
          <CgProfile className="size-5 text-gray-600" />
          <span className="font-semibold">Welcome, {user?.name}</span>
        </div>

        <div onClick={onProfileClick} className={classes}>
          <FiSettings className="size-5 text-gray-600" />
          <span className="font-medium">Profile</span>
        </div>

        {/* <div className={classes}>
          <FiHelpCircle className="size-5 text-gray-600" />
          <span className="font-medium">Help & Support</span>
        </div> */}

        <div onClick={handleLogoutClick} className={`${classes} text-red-600`}>
          <CgLogOut className="size-5" />
          <span className="font-semibold">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
