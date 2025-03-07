"use client";

import { createContext, useState, useContext, useEffect } from "react";

// สร้าง context
const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("system");

  // โหลดค่า theme จาก localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "system";
      setTheme(storedTheme);
    }
  }, []);

  // ฟังก์ชันช่วยตรวจจับธีมของระบบ
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // อัปเดตธีมเมื่อ theme เปลี่ยน
  useEffect(() => {
    if (typeof window !== "undefined") {
      const appliedTheme = theme === "system" ? getSystemTheme() : theme;

      document.documentElement.classList.toggle("dark", appliedTheme === "dark");
      localStorage.setItem("theme", theme); // บันทึกค่าธีมล่าสุด
    }
  }, [theme]);

  // อัปเดตธีมแบบเรียลไทม์ถ้าตั้งค่าเป็น "system"
  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => setTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // ฟังก์ชันเปลี่ยนธีมจาก ค่า "light", "dark" and "system"
  const themeChange = (value) => {
    setTheme(value);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider };
export default ThemeContext;
