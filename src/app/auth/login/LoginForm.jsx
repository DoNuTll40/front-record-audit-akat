"use client"

import AppHook from "@/hooks/AppHook";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import AuthHook from "@/hooks/AuthHook";
import { Button } from "primereact/button";
import { cryptoEncode } from "@/configs/crypto";

export default function LoginForm() {
    const { setArrowBack, toggleOtpModal } = AppHook();
    const {input, setInput, login, user, loginPass} = AuthHook();
    const [loadingLogin, setLoadingLogin] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null);
    const router = useRouter();

    let pathName = user?.status?.toLowerCase()

    useEffect(() => {
        
        setArrowBack(false)

        // if(loginPass){
        //     return router.push(`/${pathName}`)
        // }

    }, [router, setArrowBack, loginPass])

    // if(loginPass){
    //     return redirect(`/${pathName}`)
    // }

    
    const hdlChange = (e) => {
        setErrorMsg(null)
        setInput( prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        setErrorMsg(null)
        e.preventDefault();
        setLoadingLogin(true)

        if(input?.username === "" || input?.password === ""){
            setLoadingLogin(false);
            return toast.warning("โปรดกรอกข้อมูลให้ครบ...")
        }

        const hashInput = cryptoEncode(input)

        sessionStorage.setItem("resendOtp", hashInput)

        try {
            const rs = await login()

            if (rs.status === 200) {
                sessionStorage.setItem("token", rs.data.token);
                sessionStorage.setItem("email", rs.data.email);
                toggleOtpModal();
            }
            
        }catch(err){
            toast.error(err?.response?.data?.message)
            setErrorMsg(err?.response?.data?.message)
        } finally {
            setLoadingLogin(false);
        }
    }

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
                        className="w-full rounded-md p-2 pl-8 border" 
                        placeholder="ชื่อผู้ใช้งาน" 
                        type="text" 
                        name="username" 
                        id="username" 
                        onChange={hdlChange} 
                        required
                        onInvalid={(e) => e.target.setCustomValidity("กรุณากรอกชื่อผู้ใช้งาน")}
                        onInput={(e) => e.target.setCustomValidity("")} // รีเซ็ตข้อความเมื่อพิมพ์
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1">
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
                    onInput={(e) => e.target.setCustomValidity("")} // รีเซ็ตข้อความเมื่อพิมพ์
                />
            </div>
            <Button className="w-full rounded-md p-2 border-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white hover:cursor-pointer transition-all transform ease-in-out duration-100" disabled={loadingLogin} type="submit" label="ยืนยัน" />
        </form>
        <div className="mt-10 flex gap-2 border-none">
            <p>สร้างข้อมูลผู้ใช้งาน</p>
            <Link href="/auth/register">Click Me!</Link>
        </div>
    </div>
  )
}
