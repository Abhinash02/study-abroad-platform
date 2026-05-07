// import { createContext, useEffect, useState } from "react";
// import { loginApi, meApi, registerApi } from "../api/authApi";
// import { clearToken, getToken, setToken } from "../utils/storage";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const saveSession = (payload) => {
//     setToken(payload.token);
//     setUser(payload.user);
//   };

//   const login = async (formData) => {
//     const { data } = await loginApi(formData);
//     saveSession(data.data);
//     return data;
//   };

//   const register = async (formData) => {
//     const { data } = await registerApi(formData);
//     saveSession(data.data);
//     return data;
//   };

//   const logout = () => {
//     clearToken();
//     setUser(null);
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         if (!getToken()) {
//           setLoading(false);
//           return;
//         }
//         const { data } = await meApi();
//         setUser(data.data);
//       } catch (error) {
//         clearToken();
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import { createContext, useEffect, useState } from "react";
import { loginApi, meApi, registerApi, updateMeApi } from "../api/authApi";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = (payload) => {
    localStorage.setItem("waygood_token", payload.token);
    setUser(payload.user);
  };

  const login = async (formData) => {
    const { data } = await loginApi(formData);
    saveSession(data.data);
    return data;
  };

  const register = async (formData) => {
    const { data } = await registerApi(formData);
    saveSession(data.data);
    return data;
  };

  const updateProfile = async (formData) => {
    const { data } = await updateMeApi(formData);
    setUser(data.data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("waygood_token");
    setUser(null);
  };

  const fetchMe = async () => {
    try {
      const token = localStorage.getItem("waygood_token");
      if (!token) return;
      const { data } = await meApi();
      setUser(data.data);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile, fetchMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}