"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname(); // ดึง path ปัจจุบัน เช่น "/dashboard/users/123"
  const paths = pathname.split("/").filter((path) => path); // แยก path และกรองค่าที่ว่าง

  return (
    <nav className="text-sm text-gray-600 select-none sticky top-12 bg-white/50 backdrop-blur-md py-2 px-6">
      <ol className="flex items-center space-x-2">
        {/* Home Link */}
        <li>
          <Link href="/" className="text-gray-500 hover:underline">
            หน้าแรก
          </Link>
        </li>

        {/* Breadcrumb Links */}
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/"); // สร้าง path ทีละระดับ
          const isLast = index === paths.length - 1; // ตรวจสอบว่าเป็นอันสุดท้ายหรือไม่

          return (
            <li key={href} className="flex items-center">
              <span className="mx-1 cursor-default">/</span>
              {isLast ? (
                <span className="text-gray-600 font-semibold cursor-default">{formatPath(path)}</span>
              ) : (
                <Link href={href} className="text-gray-500 hover:underline">
                  {formatPath(path)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// แปลงชื่อ path ให้เป็นตัวอ่านง่าย
const formatPath = (path) => {
  return path.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
