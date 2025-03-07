"use client"

import ButtonBackBefore from "@/components/ButtonBackBefore";
import { useEffect } from "react";

export default function Forbidden() {

  useEffect(() => {
    document.title = "403 Forbidden"
  }, [])

  return (
    <div className='flex justify-center items-center h-screen text-2xl font-semibold bg-gradient-to-l from-gray-200 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <ButtonBackBefore />
      403 Forbidden
    </div>
  );
}
