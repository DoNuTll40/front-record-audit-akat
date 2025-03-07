
"use client"

import Header from "@/components/Header";
import SideBar from "@/components/Sidebar";
import SideHook from "@/hooks/SideHook";
import Footer from "@/components/Footer";
import ProtectedAdminRoute from "../protectedAdminRoute";
import Breadcrumb from "@/components/BreadCrumb";

export default function layout({ children }) {

  const { isOpen, isMini } = SideHook();

  return (
    <ProtectedAdminRoute>
        <div className="w-full flex flex-col h-screen">
            <SideBar />
            <div className={`flex-1 transition-all duration-100 ease-in-out ${isOpen ? (isMini ? "md:ml-14" : "md:ml-64") : "ml-0"}`}>
                <Header />
                <Breadcrumb />
                <main className="px-6 pt-4 pb-10 flex flex-col flex-1">
                  {children}
                </main>
                <Footer />
            </div>
        </div>
    </ProtectedAdminRoute>
  );
}
