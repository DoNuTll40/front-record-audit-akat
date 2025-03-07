
import "./globals.css";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "moment/locale/th"

export const metadata = {
  title: "หน้าหลัก",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <Providers>
        <ToastContainer bodyClassName="font-sarabun" />
          {children}
          </Providers>
      </body>
    </html>
  );
}
