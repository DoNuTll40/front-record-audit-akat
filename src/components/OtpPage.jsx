"use client";
import { useEffect, useState } from "react";
import AppHook from "@/hooks/AppHook";
import axios from "@/configs/axios";
import { useRouter } from "next/navigation"; // Import useRouter
import AuthHook from "@/hooks/AuthHook";
import { CircleX } from "lucide-react";

export default function OTPPage() {
  const { openModalOtp, toggleOtpModal } = AppHook();
  const { setUser, user } = AuthHook(); // Remove setLoginPass
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [disabled, setDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter(); // Initialize useRouter

  // เริ่มตัวจับเวลาเมื่อเปิด modal
  useEffect(() => {
    if (openModalOtp) {
      document.getElementById("otp-index-0")?.focus();
      setEmail(sessionStorage.getItem("email"));
      setTimeLeft(5 * 60); // รีเซ็ตเวลาใหม่เมื่อเปิด modal
      setDisabled(false); // เปิดให้กรอก OTP
    }
  }, [openModalOtp]); // เฉพาะเมื่อ openModalOtp เปลี่ยน

  // ตัวจับเวลาเมื่อเปิด modal
  useEffect(() => {
    if (timeLeft > 0 && openModalOtp) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); // ล้างตัวจับเวลาเมื่อ timeLeft <= 0
    } else {
      setDisabled(true); // หมดเวลา กรอกไม่ได้
    }
  }, [timeLeft, openModalOtp]);

  // ตรวจสอบว่า otp ครบ 6 หลักแล้วหรือไม่
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [otp]);

  // ฟังก์ชันสำหรับจัดการการกรอก OTP
  const handleChange = (e, index) => {
    if (disabled) return;
    const value = e.target.value;
    if (!/^\d$/.test(value) && value !== "") {
      setError("กรุณากรอกเฉพาะตัวเลข 0-9");
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // ย้ายโฟกัสไปช่องถัดไปถ้ากรอกแล้ว
    if (value !== "" && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  // ฟังก์ชันสำหรับการลบ
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        document.getElementById(`otp-input-${index - 1}`)?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // ฟังก์ชันจัดการการ paste ข้อมูล
  const handlePaste = (e) => {
    if (disabled) return;
    e.preventDefault();
    const pastedText = e.clipboardData.getData("Text");
    const digits = pastedText
      .split("")
      .filter((char) => /^\d$/.test(char))
      .slice(0, 6);

    if (digits.length === 6) {
      document.getElementById(`otp-input-5`)?.focus();
      setOtp(digits);
      setError("");
    } else {
      setError("กรุณากรอก OTP ให้ครบ 6 หลัก");
    }
  };

  // ฟังก์ชันสำหรับจัดการการส่ง OTP
  const handleSubmit = async () => {
    if (disabled) return;

    if (otp.every((d) => d !== "")) {
      const otpValue = otp.join("");

      let token = sessionStorage.getItem("token");

      try {
        const rs = await axios.post(
          "/auth/authVerifyOtp",
          { otpCode: otpValue },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (rs?.status === 200) {
          const rs2 = await axios.post("/auth/authVerifyToken", {}, {
              headers: {
                Authorization: `Bearer ${token}`,
              }}
          );
          
          // console.log(rs2.status === 200)
          if(rs2.status === 200){
            setUser(rs2.data.data);
            toggleOtpModal();
            setOtp(["", "", "", "", "", ""]);
            setTimeLeft(5 * 60);
            router.push(`/${user?.status.toLowerCase()}`);
          }
        }
      } catch (err) {
        setErrorMsg(err.response?.data?.message);
      }
    } else {
      setError("กรุณากรอก OTP ให้ครบ 6 หลัก");
    }
  };

  // ฟังก์ชันส่ง OTP ใหม่
  const handleResendOTP = () => {
    setButtonLoading(true); // เริ่มโหลด
    
    setTimeout(() => {
      setOtp(["", "", "", "", "", ""]); // รีเซ็ตค่า OTP
      setError(""); // ล้าง Error
      setTimeLeft(5 * 60); // เริ่มนับ 5 นาทีใหม่
      setDisabled(false); // ให้กรอก OTP ได้
      setButtonLoading(false); // หยุดโหลดเมื่อทำเสร็จ
    }, 1000); // จำลองดีเลย์ 1 วินาทีเพื่อให้เห็นสถานะ Loading
  };

  // แปลงเวลาเป็น mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={`${
        openModalOtp ? "flex" : "hidden"
      } justify-center w-full top-0 items-center h-screen bg-gray-800/40 px-2 backdrop-blur-sm absolute z-50`}
    >
      <div
        className={`bg-white p-8 px-2 md:px-4 pt-2 rounded-lg shadow-md max-w-96 select-none animate-fadeInDown`}
      >
        <div className="w-full my-5 flex flex-col gap-2">
          <h2 className="text-xl font-bold text-center text-black">
            ยืนยันหมายเลข OTP
          </h2>
          <p className="text-black text-sm">
            ระบบได้ส่งหมายเลข OTP ไปยังบัญชีอีเมลของคุณเรียบร้อยแล้ว {email}
            โปรดตรวจสอบอีเมลของคุณ
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-700 rounded-md mb-2">
            <div className="flex ml-1 gap-1 items-center text-sm text-red-700 font-medium bg-red-100 p-2 rounded-md">
              <CircleX size={18} strokeWidth={1.5} absoluteStrokeWidth />
              {errorMsg}
            </div>
          </div>
        )}

        {/* แสดงตัวจับเวลา */}
        <div className="text-center text-black text-sm mb-2">
          {disabled
            ? "หมดเวลา กรุณากดส่ง OTP อีกครั้ง"
            : `OTP จะหมดอายุใน ${formatTime(timeLeft)} นาที`}
        </div>

        <form>
          <div className="grid grid-cols-6 justify-center text-xl">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="tel"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`w-12 h-12 md:w-12 md:h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 dark:text-black font-semibold text-lg ${
                  disabled
                    ? "bg-gray-200 cursor-not-allowed"
                    : "focus:ring-blue-600"
                }`}
                placeholder="-"
                disabled={disabled}
              />
            ))}
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-sm mt-2 ml-3.5">{error}</div>
        )}

        {/* ปุ่มส่ง OTP อีกครั้ง */}
        <div className="flex justify-center mt-5">
          <button
            onClick={handleResendOTP}
            className="bg-blue-500 text-white px-4 py-2 w-[45%] rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 disabled:hover:cursor-not-allowed"
            disabled={!disabled || buttonLoading}
          >
            {buttonLoading ? (
              <div className="w-full flex justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-[4px] border-gray-300 border-t-blue-800 block"></span>
              </div>
            ) : (
              "ส่ง OTP อีกครั้ง"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
