"use client";

import AuthHook from "@/hooks/AuthHook";
import SideHook from "@/hooks/SideHook";
import { BookText, ChevronDown, ChevronRight, CircleUser, House, LayoutDashboard, Lock, LockOpen, Minus, Settings, ShieldUser } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SideBar() {
  const { user } = AuthHook();
  const { isOpen, isMini, toggleMini } = SideHook();
  const [onHover, setOnHover] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null); // ใช้เพื่อตรวจสอบเมนูย่อยที่เปิดอยู่
  const router = useRouter();
  const pathname = usePathname();

  const role = window.location.pathname.split("/")[1];

  const adminSideBar = [
    {
      icon: <CircleUser size={22} strokeWidth={1} />,
      name: "หน้าต่างผู้ใช้งาน",
      path: "/user",
      title: "หน้าผู้ใช้ทั่วไป",
    },
    {
      icon: <LayoutDashboard size={22} strokeWidth={1} />, // ใส่ไอคอนที่ต้องการ
      name: "Dashboard",
      path: "/admin/dashboard",
      title: "แดชบอร์ด",
      submenu: [
        { name: "สถิติ", path: "/admin/stats" },
        { name: "รายงาน", path: "/admin/reports" },
      ],
    },
    {
      icon: <Settings size={22} strokeWidth={1} />,
      name: "การตั้งค่า",
      path: "/admin/settings",
      title: "การตั้งค่า",
      submenu: [
        { name: "กลุ่มคนไข้", path: "/admin/settings/patient-services" },
        { name: "หัวข้อบันทึก", path: "/admin/settings/content-record" },
        { name: "ประเภท", path: "/admin/settings/type-sql" },
        { name: "overall-finding", path: "/admin/settings/overall-finding" },
        { name: "logs", path: "/admin/settings/logs" },
      ],
    },
  ];

  const userSideBar = [
    {
      icon: <House size={22} strokeWidth={1} />,
      name: "หน้าหลัก",
      path: "/user",
      title: "หน้าแรก",
    },
    {
      icon: <BookText size={22} strokeWidth={1} />,
      name: "ฟอร์ม",
      path: "/user/form",
      title: "ฟอร์ม",
      submenu: [
        { name: "ฟอร์ม IDP", path: "/user/form/ipd" },
        { name: "ฟอร์ม OPD", path: "/user/form/opd" },
        { name: "ฟอร์ม ER", path: "/user/form/er" },
      ],
    },
    {
      icon: <ShieldUser size={22} strokeWidth={1} />,
      name: "ผู้ดูแลระบบ",
      path: "/admin",
      title: "หน้าแอดมิน",
      status: "ADMIN",
      lock: <Lock size={15} strokeWidth={1} />,
      unLock: <LockOpen size={15} strokeWidth={1} />
    }
  ];

  const handleSubmenuToggle = (index) => {
    setSubmenuOpen(submenuOpen === index ? null : index);
  };

  const activeMenu = (role?.toLowerCase() === "admin" ? adminSideBar : userSideBar).reduce((prev, curr) => {
    return pathname.startsWith(curr.path) && curr.path.length > prev.path.length ? curr : prev;
  }, { path: "" });

  const isActive = (item) => item.path === activeMenu.path;

  return (
    <div
      className={`${isOpen ? (isMini ? `w-14 ${onHover ? "w-64" : ""}` : "w-64") : "w-0"} bg-white dark:bg-gray-800 dark:text-white hidden md:flex justify-between flex-col border-r-2 text-sm border-black/20 fixed top-0 h-screen left-0 transition-all duration-200 ease-in-out z-[60] overflow-hidden drop-shadow-md`}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      {isOpen && (
        <div className="px-1 pt-2 h-fit overflow-hidden flex flex-col w-64 select-none">
          <div className={`bg-white rounded-md ${isMini && !onHover ? "max-w-[18%]" : ""}`}>
            <img
              className="rounded-md pointer-events-none"
              src={`${isMini && !onHover ? "https://yt3.googleusercontent.com/s5JGFl20u7Ms6biovtpo6g6C2E1GFOtrqx_1f0ZJTicU14Ce0wtN7mPwRuqYDb29r9ImKXDpvM4=s900-c-k-c0x00ffffff-no-rj" : "https://authenservice.nhso.go.th/authencode/assets/img/brand/nhso.png"}`}
              alt=""
            />
          </div>
          {/* <hr className={`my-4 mx-12 ${isMini && !onHover && "hidden"}`} /> */}

          <div className="my-2 flex flex-col gap-1.5 px-1 overflow-auto">
            {(role?.toLowerCase() === "admin" ? adminSideBar : userSideBar).map((item, index) => (
              <div key={index}>
                <p className={`flex justify-between items-center gap-2 p-2 rounded-md transition hover:cursor-pointer 
                  ${isActive(item) && isMini && !onHover ? "bg-gradient-to-t from-[#19498A] to-[#205cb0] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                  onClick={() => !item.submenu ? router.push(item.path) : handleSubmenuToggle(index)}
                  >
                  <div className="flex gap-1.5" key={index}>
                    <span>{item.icon}</span>
                    <span className={`${isMini && !onHover && "hidden"}`}>{item.name}</span>
                  </div>
                  {item.submenu && (
                    <ChevronDown
                      className={`transform transition-all ease-in-out duration-300 ${submenuOpen === index && " -rotate-180"}`}
                      size={16}
                      strokeWidth={1}
                    />
                  )}
                  {item.status && user?.status !== item.status ? item.lock : item.unLock}
                </p>
                {item.submenu && submenuOpen === index && (!isMini || onHover) && (
                  <div className="pl-4 not-dark:shadow-inner shadow-gray-200 rounded-b-md">
                    {item.submenu.map((submenuItem, subIndex) => (
                      <p
                        key={subIndex}
                        onClick={() => router.push(submenuItem.path)}
                        className={`flex items-center gap-2 p-2 rounded-md transition hover:cursor-pointer
                          ${pathname === submenuItem.path ? "bg-gradient-to-t from-[#19498A] to-[#205cb0] text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                      >
                        <span className="flex items-center">- {submenuItem.name}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className={`w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 hover:cursor-pointer h-8 flex ${isMini ? (onHover ? `justify-end` : `justify-center`) : "justify-end"}`}
          onClick={toggleMini}
        >
          <button className="dark:text-white px-2" aria-label={isMini ? "Expand sidebar" : "Collapse sidebar"}>
            <ChevronRight size={16} className={`${isMini ? " rotate-0 " : " rotate-180 "} transition-all transform ease-in-out duration-500`} />
          </button>
        </div>
      )}
    </div>
  );
}
