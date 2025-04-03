import { useRouter } from "next/router";
import React, { useState } from "react";
import { loginUser } from "@/pages/api/auth";
import Link from "next/link";

export default function login(){
    const [form , setForm] = useState({email:"",password:""});
    const [error , setError] = useState("");
    const route = useRouter();

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        setError("");
        

        try{
            const response = await loginUser(form);

            if (response.token) {
                localStorage.setItem("token", response.token);
                route.push("/auth/dashboard");
            } else {
                setError(response.error || "Invalid credentials");
                }
        }
        catch(error){
            setError("Invalid User")
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen lg:h-dvh w-full bg-slate-100">
            <form onSubmit={handleSubmit} className="flex flex-col mb-4 bg-white w-1/2 h-fit py-4 lg:py-8 xl:py-16 2xl:py-20 items-center justify-center rounded-[5px] shadow-2xl">
                <h2 className="text-[20px] lg:text-[30px] xl:text-[40px] 2xl:text-[80px] text-slate-700 font-semibold mb-4 lg:mb-6 2xl:mb-18">LOGIN</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input 
                type="email"
                placeholder="Email"
                value={form.email} 
                className="border-[1px] border-slate-300 p-2 2xl:p-3 mb-4 2xl:mb-8 w-2/3 lg:w-1/2 text-[10px] lg:text-[15px] xl:text-[20px] 2xl:text-[35px] rounded-[10px]"
                onChange={(e)=>setForm({...form , email:e.target.value})}
                />
                <input 
                type="password"
                placeholder="Password"
                value={form.password} 
                className="border-[1px] border-slate-300 p-2 2xl:p-3 mb-4 lg:mb-6 xl:mb-8 2xl:mb-12 w-2/3 lg:w-1/2 text-[10px] lg:text-[15px] xl:text-[20px] 2xl:text-[35px] rounded-[10px]"
                onChange={(e)=>setForm({...form , password:e.target.value})}
                />
                <button className="py-1.5 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] lg:text-[16px] xl:text-[22px] 2xl:text-[40px] rounded-[10px] text-white bg-slate-700 hover:bg-slate-600">Login</button>
                <Link href={"/auth/signup"} className="mt-3">
                <p className="text-[8px] lg:text-[11px] xl:text-[14px] 2xl:text-[24px]">Don't have an account ?<span className="text-[10px] lg:text-[12px] xl:text-[16px] 2xl:text-[28px] text-blue-600 border-b-[1px] ml-2">Sign Up</span></p>
                </Link> 
            </form>
        </div>
    );
}