"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/configs/axios";
import { toast } from "react-toastify";
import AppHook from "@/hooks/AppHook";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [input, setInput] = useState({
    username: "",
    password: ""
  });
  const [user, setUser] = useState("");
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับ loading
  const [loginPass, setLoginPass] = useState(false); // เพิ่ม state สำหรับ loading
  const router = useRouter();

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    verifyToken(token);
  }, []);

  const verifyToken = async (token) => {
    try {
      const rs = await axios.post(
        "/auth/authVerifyToken",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (rs.status === 200) {
        setUser(rs.data.data);
        sessionStorage.setItem("isAuthen_Data", JSON.stringify(rs.data.data));
      }

      return rs;
    } catch (err) {
      console.log(err);
      sessionStorage.removeItem("isAuthen_Data");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      if(err.response.data.message === "TokenExpiredError"){
        logout()
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    const rs = await axios.post("auth/authLogin", input);
    return rs
  };

  const logout = async () => {
    setLoading(true)
    let token = sessionStorage.getItem("token");
    try {
      const rs = await axios.post("/auth/authLogout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(rs.status === 200){
        toast.success(rs.data.message)
        setUser(null);
        sessionStorage.removeItem("isAuthen_Data");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        router.push("/");
      }
    } catch (err) {
      console.log(err)
      if(err.response.data.message.startWith === "token"){
        return logout()
      }
    } finally {
      setLoading(false)
      setLoginPass(false)
    }
  };

  const value = {
    input,
    setInput,
    user,
    setUser,
    login,
    logout,
    loading,
    setLoading,
    openModalProfile,
    setOpenModalProfile,
    verifyToken,
    loginPass,
    setLoginPass
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContextProvider };
export default AuthContext;
