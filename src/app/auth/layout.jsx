"use client"

import OTPPage from "@/components/OtpPage";
import AppHook from "@/hooks/AppHook";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ProtectedAuthRoute from "../protectedAuthRoute";

export default function _layout({children}) {
  const router = useRouter();

  const { arrowBack } = AppHook()
  
  return (
    <ProtectedAuthRoute>
      <div className="flex justify-center w-full top-0 items-center h-screen px-2 backdrop-blur-sm">
        <OTPPage />
        <div className="w-96 bg-gray-50 text-black shadow-lg hover:border-black/20 h-fit rounded-md p-4 transition-all transform ease-in-out duration-300">
          {arrowBack && (
            <div className="p-2 w-fit border rounded-full shadow-md hover:border-black/20 hover:bg-gray-200 mb-1 hover:cursor-pointer" onClick={() => router.push("/auth/login")}>
              <ChevronLeft />
            </div>
          )}
          {children}
        </div>
      </div>
    </ProtectedAuthRoute>
  )
}
