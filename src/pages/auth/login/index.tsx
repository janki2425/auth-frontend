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
        <div className="flex items-center justify-center min-h-screen lg:h-dvh w-full bg-black">
            <form onSubmit={handleSubmit} className="flex flex-col bg-black w-[382px] px-6 h-fit py-6 justify-center rounded-[10px] outline-[0.5px]">
                <h2 className="text-[24px] mb-1 text-slate-100 font-semibold">Login</h2>
                <p className="mb-4 opacity-60 text-[14px]">Enter your email below to login to your account</p>
                {error && <p className="text-red-600">{error}</p>}
                <label htmlFor="email" className="text-[14px]">Email</label>
                <input 
                id="email"
                name="email"
                type="email"
                placeholder="E@example.com"
                value={form.email} 
                className="outline-[0.5px] px-3 py-1.5 mb-6 mt-1 2xl:mb-8 w-full bg-black text-[16px] rounded-[5px]"
                onChange={(e)=>setForm({...form , email:e.target.value})}
                />
                <div className="flex justify-between">
                    <label htmlFor="password" className="text-[14px]">Password</label>
                    <Link href={"/auth/reset"}>
                        <p className="text-[14px]">Forgot your password?</p>
                    </Link>
                </div>
                <input 
                id="password"
                name="paaword"
                type="password"
                value={form.password} 
                className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]"
                onChange={(e)=>setForm({...form , password:e.target.value})}
                />
                <button className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600">Login</button>
                <button className="outline-[0.5px] mt-7 py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-white bg-transparent">Login with Google</button>
                <Link href={"/auth/signup"} className="mt-3 mx-auto">
                <p className="text-[14px]">Don't have an account ?<span className="text-[14px] border-b-[1px] ml-1 pb-[1px]">Sign up</span></p>
                </Link> 
            </form>
        </div>
    );
}