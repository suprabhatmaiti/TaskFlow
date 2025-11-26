import { Outlet } from "react-router-dom";
import useAuth from "./hook/useAuth";
import LoadingOverlay from "./components/LoadingOverlay";
import Header from "./components/header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLoggedIn, loading } = useAuth();
  return (
    <>
      <ToastContainer />
      {loading && <LoadingOverlay />}
      <div>
        {isLoggedIn && <Header />}
        <Outlet />
      </div>
    </>
  );
}

export default App;
