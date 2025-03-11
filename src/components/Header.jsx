import ThemeHook from "@/hooks/ThemeHook";
import Select from "./Select";
import { Menu, MonitorSpeaker, Moon, PanelTopClose, Settings2, Sun } from "lucide-react";
import AuthHook from "@/hooks/AuthHook";
import { Avatar } from "primereact/avatar";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import SideHook from "@/hooks/SideHook";
import { Dropdown } from "primereact/dropdown";

export default function Header() {

  const { theme, themeChange } = ThemeHook();
  const { logout, user } = AuthHook();
  const { isOpen, toggleSidebar } = SideHook();

  const [openProfile, setOpenProfile] = useState(false);

  const options = [
    { value: "system", label: "System", icon: <MonitorSpeaker size={16} /> },
    { value: "light", label: "Light", icon: <Sun size={16} /> },
    { value: "dark", label: "Dark", icon: <Moon size={16} /> },
  ];

  const headerContent = (row) => {
    return (
        <h1 className="font-semibold flex gap-1 justify-center">โปรไฟล์</h1>
    )
  }

  const hdlCloseModal = () => {
    setOpenProfile(false)
  }

  const optionTemplate = (option) => {
    return (
      <div className="flex items-center gap-2">
        {option.icon}
        <span>{option.label}</span>
      </div>
    );
  };  

  const valueTemplate = (option) => {
    if (!option) return <span>Select Theme</span>; // แสดงค่าเริ่มต้น
    return (
      <div className="flex items-center gap-2">
        {option.icon}
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="sticky top-0 h-12 bg-white dark:bg-gray-800 transition-all duration-200 ease-in-out select-none z-50">
      <div className="flex justify-between items-center h-full max-w-[98vw] mx-auto px-4 font-semibold">
        <div className="flex gap-2 items-center">
          <div className=" hover:bg-gray-200 p-2 rounded-md hover:text-black/50" onClick={toggleSidebar}><Menu strokeWidth={1.5} /></div>
          <p>Medical Record Audit | 11098</p>
        </div>
        <div className="flex items-center">
          <Avatar className="hover:opacity-80 hover:cursor-pointer" image={`https://ui-avatars.com/api/?name=${user.fullname}&size=256&format=svg&background=E0E0E0`} shape="circle" onClick={ () => setOpenProfile(true)} />
        </div>
      </div>

      {openProfile && (
        <div className="fixed w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-black/40 opacity-100 animate-fadeIn select-none z-[100]">
          <Dialog
            visible={openProfile}
            modal
            onHide={() => {if (!openProfile) return; hdlCloseModal(); }}
            className="bg-white dark:bg-gray-800 px-4 pt-4 pb-2 rounded-sm min-h-96 w-96 select-none mx-4 shadow-lg dark:shadow-white/15 text-sm"
            header={headerContent}
            >

            <hr className="mt-2 opacity-20" />

            <div className="max-w-[100px] mx-auto my-5 drop-shadow-md">
              <img className="rounded-full" src={`https://ui-avatars.com/api/?name=${user.fullname}&size=256&format=svg&background=E0E0E0`} alt="Profile" />
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-sm flex flex-col gap-0.5 shadow-inner dark:shadow-gray-800">
              <p>ชื่อ-นามสกุล {user.fullname}</p>
              <p>ตำแหน่ง {user.position}</p>
              <p>แผนก {user.department}</p>
            </div>

            <hr className="my-4 opacity-20" />

            <div className="flex justify-between items-center">
              <p>Theme</p>
              <Dropdown
                options={options}
                value={theme}
                optionLabel="label"
                placeholder="Select Theme"
                className=" w-2/5 bg-gray-200 dark:bg-gray-600 rounded-md"
                itemTemplate={optionTemplate}
                valueTemplate={valueTemplate}
                onChange={ (e) => themeChange(e.value)}
              />
            </div>
            <hr className="my-4 opacity-20" />
            <div className="flex items-center justify-between mb-4">
              <p>ออกจากระบบบนอุปกรณ์นี้</p>
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-md p-2" onClick={logout} label="ออกจากระบบ" />
            </div>
            {/* <hr className="my-4 opacity-30" /> */}

            {/* {errorMsg && <div className="bg-red-700 rounded-md "><div className="flex ml-1 gap-1 items-center text-sm text-red-700 font-medium bg-red-100 p-2 rounded-md"><CircleX size={30} strokeWidth={2} absoluteStrokeWidth />{errorMsg}</div></div> } */}

          </Dialog>
        </div>
      )}
    </div>
  );
}
