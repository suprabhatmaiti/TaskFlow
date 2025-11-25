import loginImg from "../../assets/loginImg.svg";
import { MdTaskAlt } from "react-icons/md";
import useAuth from "../../hook/useAuth";
import {
  initialState,
  reducer,
  UPDATE_FIELD,
  RESET_FORM,
  SET_ERROR,
} from "./reducers/authReducer.js";
import { useReducer } from "react";
import { toast } from "react-toastify";

function RegisterPage({ setLoginPage }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { register } = useAuth();

  const handleSignupClick = async (e) => {
    e.preventDefault();
    const payload = {
      name: state.name,
      email: state.email,
      password: state.password,
    };
    try {
      const endpoint = register(payload);
      await endpoint;
    } catch (error) {
      if (error.response?.data?.error) {
        dispatch({ type: SET_ERROR, value: error.response.data.error });
        toast.error(error.response.data.error, {
          position: "top",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } finally {
      dispatch({ type: RESET_FORM });
    }
  };

  const handleNameChange = (e) => {
    dispatch({ type: UPDATE_FIELD, field: "name", value: e.target.value });
  };
  const handleEmailChange = (e) => {
    dispatch({ type: UPDATE_FIELD, field: "email", value: e.target.value });
  };
  const handlePasswordChange = (e) => {
    dispatch({ type: UPDATE_FIELD, field: "password", value: e.target.value });
  };
  const handleConfirmPasswordChange = (e) => {
    dispatch({
      type: UPDATE_FIELD,
      field: "confirmPassword",
      value: e.target.value,
    });
  };

  const handleLoginClick = () => {
    setLoginPage(true);
    dispatch({ type: RESET_FORM });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-around items-center w-full min-h-screen px-4 sm:px-8 md:px-16 dark:bg-gray-900 dark:text-white bg-gray-50">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <div className="text-center">
          <img
            className="shadow-[0px_20px_207px_10px_rgba(127,_228,_230,_0.43)] max-w-md rounded-xl size-70"
            src={loginImg}
            alt="loginImg"
          />
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Organize your work
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Simplify your life, one task at a time.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center ">
        <div className="flex gap-2 items-center text-2xl font-bold mb-6">
          <div className="border-2 p-1 border-blue-600 rounded-lg bg-blue-600">
            <MdTaskAlt className="text-3xl text-white" />
          </div>
          <span className="text-gray-800 dark:text-white">TaskFlow</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Create an Account
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Get started with TaskFlow today!
        </p>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={state.name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              id="signupEmail"
              type="text"
              placeholder="Enter your email"
              value={state.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              id="signupPassword"
              placeholder="Enter your Password"
              type="password"
              value={state.password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              id="confirm-password"
              placeholder="Confirm your Password"
              type="password"
              value={state.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:text-blue-800 dark:hover:text-blue-400 font-semibold"
                onClick={handleLoginClick}
              >
                Sign in
              </span>
            </p>
          </div>
          <div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;
