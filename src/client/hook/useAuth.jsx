import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";
import api, { setAccessToken } from "../utils/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserSpecs = (data) => {
    setUser(data);
  };
  const decodeAndSetUser = (token) => {
    if (!token) {
      setUserSpecs(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUserSpecs(decoded);
    } catch (error) {
      console.log("Error decoding token:", error);
      setUserSpecs(null);
    }
  };
  const toggleRefresh = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/auth/refresh-token");
      setAccessToken(data.accessToken);
      decodeAndSetUser(data.accessToken);
    } catch (error) {
      // console.log("Error refreshing token:", error);
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.post("/api/auth/refresh-token");
        setAccessToken(data.accessToken);
        decodeAndSetUser(data.accessToken);
      } catch (error) {
        // console.log("Error refreshing token:", error);
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const register = async (payload) => {
    try {
      const response = await api.post("/api/auth/register", payload);
      const { accessToken, user } = response.data;
      decodeAndSetUser(accessToken);
      setAccessToken(accessToken);
      return { accessToken, user };
    } catch (err) {
      console.log("Error during registration:", err);
      throw err;
    }
  };

  const login = async (payload) => {
    try {
      const response = await api.post("/api/auth/login", payload);
      const { accessToken, user } = response.data;
      decodeAndSetUser(accessToken);
      setAccessToken(accessToken);
      return { accessToken, user };
    } catch (err) {
      console.log("Error during login:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout", null, { withCredentials: true });
    } catch (error) {
      console.log("Error during logout:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        register,
        login,
        logout,
        loading,
        setUserSpecs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
