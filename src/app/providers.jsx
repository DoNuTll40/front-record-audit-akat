"use client";

import { AppContextProvider } from "@/contexts/AppContext";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
// import "primereact/resources/themes/lara-light-cyan/theme.css";

export function Providers(props) {
  const value = {
    ripple: true,
  };

  return (
    <AppContextProvider>
      <AuthContextProvider>
        <ThemeContextProvider>
          <SidebarContextProvider>
            <PrimeReactProvider value={value}>
              <AntdRegistry>{props.children}</AntdRegistry>
            </PrimeReactProvider>
          </SidebarContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </AppContextProvider>
  );
}
