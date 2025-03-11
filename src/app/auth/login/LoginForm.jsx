
"use client"

import AppHook from "@/hooks/AppHook";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AuthHook from "@/hooks/AuthHook";
import { Button } from "primereact/button";
import { cryptoEncode } from "@/configs/crypto";

export default function LoginForm() {
    const { setArrowBack, toggleOtpModal } = AppHook();
    const {input, setInput, login, loginPass} = AuthHook();
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null);
    const [showInputPassword, setShowInputPassword] = useState(true)
    const router = useRouter();

    useEffect(() => {
        setArrowBack(false)

    }, [router, setArrowBack, loginPass])

    
    const hdlChange = (e) => {
        setErrorMsg(null)
        setInput( prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null)
        setLoadingLogin(true)
        const hashInput = await cryptoEncode(input)

        try {
            const rs = await login()
            
            if (rs.status === 200) {
                sessionStorage.setItem("token", rs.data.token);
                sessionStorage.setItem("email", rs.data.email);
                sessionStorage.setItem("resend", hashInput);
                toggleOtpModal();
            }
            
        }catch(err){
            if(showInputPassword && err.response.data.message.startsWith("รหัสผ่านไม่ถูกต้องกรุณาตรวจสอบรหัสแล้วกรอกใหม่!")){
                return setShowInputPassword(false);
            }
            toast.error(err?.response?.data?.message)
            setErrorMsg(err?.response?.data?.message)
        } finally {
            setLoadingLogin(false);
        }
    }

    useEffect(() => {
        document.getElementById("password")?.focus()
    }, [showInputPassword])

    return (
        <div>
            <p className="font-bold text-xl text-center border-none my-6">เข้าสู่ระบบ</p>
            <form className="flex flex-col gap-4 select-none border-none" onSubmit={hdlSubmit}>
                {errorMsg !== null && <p className="text-sm animate-fadeInDown text-red-600 font-semibold bg-red-100 p-3 rounded-md line-clamp-1">{errorMsg}</p>}
                <div className="flex flex-col gap-1">
                    <p>ชื่อผู้ใช้งาน</p>
                    <div className="relative">
                        <UserRound className=" absolute bottom-2.5 left-1.5 p-0.5 " />
                        <input 
                            className="w-full rounded-md p-2 pl-8 border disabled:bg-gray-300 disabled:border-green-700/50 disabled:cursor-not-allowed" 
                            placeholder="ชื่อผู้ใช้งาน" 
                            type="text" 
                            name="username" 
                            id="username" 
                            onChange={hdlChange} 
                            required
                            onInvalid={(e) => e.target.setCustomValidity("กรุณากรอกชื่อผู้ใช้งาน")}
                            onInput={(e) => e.target.setCustomValidity("")}
                            disabled={!showInputPassword}
                        />
                    </div>
                </div>
                {!showInputPassword && (
                    <div className={`flex flex-col gap-1`}>
                        <p>รหัสผ่าน</p>
                        <input 
                            className="w-full rounded-md p-2 border" 
                            placeholder="รหัสผ่าน"
                            type="password"
                            name="password"
                            id="password"
                            onChange={hdlChange}
                            required
                            aria-required="true"
                            onInvalid={(e) => e.target.setCustomValidity("กรุณากรอกรหัสผ่าน")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                    </div>
                )}
                <Button className="w-full rounded-md p-2 border-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:cursor-pointer transition-all transform ease-in-out duration-100" disabled={loadingLogin} type="submit" label="ยืนยัน" />
            </form>
            <div className="mt-10 flex gap-2 border-none">
                <p>สร้างข้อมูลผู้ใช้งาน</p>
                <Link href="/auth/register">Click Me!</Link>
            </div>
        </div>
    )
}
