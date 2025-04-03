import { useRouter } from "next/router";
import React, { useState } from "react";
import { loginUser } from "@/pages/api/auth";
import Link from "next/link";
import { toast } from "react-toastify";

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
                toast.success("Login successful!");
                localStorage.setItem("token", response.token);
                route.push("/auth/dashboard");
            } else {
                toast.error("Login failed. Please try again.");
                setError(response.error || "Invalid credentials");
                }
        }
        catch(error){
            setError("Invalid User")
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen lg:h-dvh w-full bg-black opacity-95">
            <form onSubmit={handleSubmit} className="flex flex-col mb-4 bg-black opacity-100 w-1/3 px-10 h-fit py-6 justify-center rounded-[40px] border-[0.1px] border-gray-400 shadow-2xl">
                <h2 className="text-[10px] xl:text-[40px] 2xl:text-[80px] text-slate-100 font-semibold">Login</h2>
                <p className="w-2/3 mb-4 opacity-60">Enter your email below to login to your account</p>
                {error && <p className="text-red-600">{error}</p>}
                <label htmlFor="email">Email</label>
                <input 
                id="email"
                name="email"
                type="email"
                placeholder="E@example.com"
                value={form.email} 
                className="border-[1px] border-slate-300 p-3 mb-4 mt-2 2xl:mb-8 w-full text-[14px] rounded-[10px]"
                onChange={(e)=>setForm({...form , email:e.target.value})}
                />
                <label htmlFor="password">Password</label>
                <input 
                id="password"
                name="paaword"
                type="password"
                value={form.password} 
                className="border-[1px] border-slate-300 p-3 mt-2 mb-4 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[14px] rounded-[10px]"
                onChange={(e)=>setForm({...form , password:e.target.value})}
                />
                <button className="py-1.5 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[18px] font-[500] tracking-[0.5px] rounded-[10px] text-black bg-slate-200 hover:bg-slate-600">Login</button>
                <Link href={"/auth/signup"} className="mt-3 mx-auto">
                <p className="text-[8px] lg:text-[11px] xl:text-[14px] 2xl:text-[24px]">Don't have an account ?<span className="text-[9px] lg:text-[12px] xl:text-[16px] 2xl:text-[28px] text-blue-600 border-b-[1px] border-blue-600 ml-2">Sign Up</span></p>
                </Link> 
            </form>
        </div>
    );
}