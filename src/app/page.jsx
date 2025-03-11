"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter(); // เรียกใช้งาน useRouter()

  return (
    <div className="flex flex-col justify-center items-center h-screen text-4xl font-semibold">
      <h1>Welcome to NextJS</h1>
      <button
        className="text-lg my-2 p-2 border-2 border-gray-600 px-6 rounded-lg drop-shadow-lg bg-black/30 hover:cursor-pointer hover:bg-black/40 hover:border-gray-800"
        onClick={() => router.push("/auth/login")} // ใช้ router.push() เพื่อเปลี่ยนหน้า
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}
