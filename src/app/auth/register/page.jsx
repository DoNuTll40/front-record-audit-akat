
"use client"

import { cryptoDecode, cryptoEncode } from "@/configs/crypto";
import { IdCard } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "@/configs/axios";
import AppHook from "@/hooks/AppHook";
import { redirect, useRouter } from "next/navigation"
export default function Register() {
  const [idenId, setIdenId] = useState("");
  const [error, setError] = useState(null)
  const [checkPermission, setCheckPermission] = useState(false);

  const { setArrowBack } = AppHook();

  const router = useRouter();

  useEffect(() => {
    setArrowBack(true)
  }, [])

  const hdlSubmit = async () => {
    if (!idenId) {
      alert("กรุณากรอกหมายเลขบัตรประชาชน");
      return;
    }

    if (!checkPermission) {
      document.getElementById("vehicle1")?.focus();
      toast.info("กรุณากดยินยอมใช้ข้อมูล");
      return;
    }

    if(idenId.length !== 13){
      return toast.warning("หมายเลขบัตรประชาชนไม่ครบ 13 หลัก")
    }

    const encoded = await cryptoEncode(idenId);

    const data = { national_id: encoded };

    try {
      const rs = await axios.post("/auth/authRegister", data);

      if (rs.status === 200) {
        toast.success(rs.data.message);
        router.push("/auth/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const hdlChange = (e) => {
    const value = e.target.value;
    if (!/^\d+$/.test(value) && value !== "") {
      setError("กรุณากรอกเฉพาะตัวเลข 0-9");
      return;
    }

    if(value){
      setError(null)
    }

    setIdenId(value)
  }

  return (
      <div className="select-none border-none">
        <h1 className="font-bold text-xl text-center my-4">สมัครใช้งานระบบ</h1>
        <div className="flex gap-1 items-center">
          <IdCard className=" stroke-1" />
          <p className="my-1">หมายเลขบัตรประชาชน</p>
        </div>
        <input
          className={`w-full rounded-md p-2 border ${error && "border-red-600 focus:ring-red-500"} `}
          type="tel"
          placeholder="หมายเลขบัตรประชาชน"
          value={idenId}
          minLength="13"
          maxLength="13"
          onChange={(e) => hdlChange(e)}
          />

        {error && <p className="text-sm text-red-500 font-semibold pl-1">{error}</p>}

        <div className="flex gap-1 my-2 text-sm items-center group">
          <input
            className=" rounded-full group-hover:cursor-pointer"
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="Bike"
            onClick={() => setCheckPermission(!checkPermission)}
            />
          <label htmlFor="vehicle1" className="group-hover:cursor-pointer">
            ฉันยินยอมให้ใช้หมายเลขบัตรประชาชนของฉัน
          </label>
        </div>

        <button
          className="my-4 p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer transition-all transform ease-in-out duration-150 text-white rounded-md w-full"
          disabled={idenId.length !== 13}
          onClick={hdlSubmit}
        >
          ยืนยัน
        </button>
      </div>
  );
}
