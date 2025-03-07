"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Select({ options, value, onChange, className, light, dark }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className} rounded-md`}>
      {/* Select Box */}
      <div
        className="flex items-center justify-between p-2 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {/* แสดง icon ถ้ามี */}
          {options.find((option) => option.value === value)?.icon}
          <span className="ml-1">
            {options.find((option) => option.value === value)?.label ||
              "Select..."}
          </span>
        </div>
        <ChevronDown className={` transition-all ease-in-out duration-200 ${isOpen ? " rotate-180" : " rotate-0"}`} />
      </div>

      {/* Drop-down Menu */}
      {isOpen && (
        <div className={` absolute left-0 right-0 mt-2 border bg-${light} dark:bg-${dark} border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden`} onPointerLeave={ () => setIsOpen(!isOpen)}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center p-2 overflow-hidden cursor-pointer ${
                option.value === value ? "bg-blue-200" : "hover:bg-gray-700"
              }`}
              onClick={() => handleSelect(option)}
            >
              {/* แสดง icon ถ้ามี */}
              {option.icon && <div className="mr-1">{option.icon}</div>}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
