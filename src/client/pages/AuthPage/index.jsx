import { useReducer, useState } from "react";

import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import useAuth from "../../hook/useAuth";
function AuthPage() {
  const [loginPage, setLoginPage] = useState(true);

  return (
    <div className="relative overflow-hidden w-full min-h-screen">
      <div
        className={`absolute w-full h-full transition-transform duration-500 ${
          loginPage ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <LoginPage setLoginPage={setLoginPage} />
      </div>
      <div
        className={`absolute w-full h-full transition-transform duration-500 ${
          loginPage ? "transform translate-x-full" : "transform translate-x-0"
        }`}
      >
        <RegisterPage setLoginPage={setLoginPage} />
      </div>
    </div>
  );
}
export default AuthPage;
