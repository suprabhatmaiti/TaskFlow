import { Outlet } from "react-router-dom";
import useAuth from "./hook/useAuth";
import LoadingOverlay from "./components/LoadingOverlay";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isloggedIn, loading } = useAuth();
  return (
    <>
      <ToastContainer />
      {loading && <LoadingOverlay />}
      {isloggedIn && <Header />}

      <Outlet />
    </>
  );
}

export default App;
