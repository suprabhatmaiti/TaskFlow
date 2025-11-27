import React, { useState } from "react";
import useAuth from "../../hook/useAuth";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user, setUserSpecs, logout } = useAuth();

  console.log(user);
  const initial = user?.name?.charAt(0)?.toUpperCase();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    id: user?.id,
    email: user?.email,
    name: user?.name,
  });

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  const handleClick = () => {
    setDisabled(!disabled);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const onUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        name: userDetails.name,
      };
      const response = await api.post("/api/auth/update-profile", payload);
      setUserDetails(response.data.user);
      toast.success("Profile Updated Successfully");
      navigate("/");
      setUserSpecs((prev) => ({ ...prev, ...userDetails }));
    } catch (error) {
      if (error?.response?.data?.error)
        toast.error(error?.response?.data?.error);
      else toast.error("Something went wrong");
      setUserDetails({
        id: user?.id,
        email: user?.email,
        name: user?.name,
      });
    } finally {
      setLoading(false);
    }
    setDisabled(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow">
            {initial}
          </div>
        </div>

        <form
          className="text-center text-sm md:text-base mb-6"
          onSubmit={onSubmit}
        >
          <div>
            <label className="flex text-gray-700  font-bold mb-2">Name</label>
            <input
              value={userDetails.name}
              name="name"
              className="bg-gray-200 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
              disabled={disabled}
              onChange={handleChange}
            />
          </div>
          <div className="flex  justify-end items-end gap-2">
            {!disabled && (
              <button
                type="submit"
                onClick={handleClick}
                className="cursor-pointer bg-gray-200 hover:bg-gray-400 active:bg-gray-200   px-2 py-1 mt-2 rounded-lg font-semibold transition disabled:opacity-50  duration-200"
              >
                Cancel
              </button>
            )}
            {!disabled ? (
              <button
                type="submit"
                onClick={onUpdate}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 mt-2 rounded-lg font-semibold transition disabled:opacity-50  duration-200"
              >
                {loading ? "Updating..." : "Save"}
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleClick}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 mt-2 rounded-lg font-semibold transition disabled:opacity-50  duration-200"
              >
                Edit
              </button>
            )}
          </div>
          <div>
            <label className=" flex text-gray-700 font-bold mb-2">Email</label>
            <input
              value={userDetails.email}
              name="email"
              className="bg-gray-200 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none"
              disabled
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="h-px bg-gray-300 mb-6"></div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
