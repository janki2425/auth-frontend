import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerUser } from "@/pages/api/auth";
import Link from "next/link";
import { toast } from "react-toastify";

export default function signup(){
    const [form , setForm] = useState({first_name:"",last_name:"",email:"",password:""});
    const [error , setError] = useState("");
    const route = useRouter();

    const handleSubmit = async(e : React.FormEvent)=>{
        e.preventDefault();
        setError("");

        try{
            const response = await registerUser(form);

            if (response.error) {
                setError(response.error);
            } else {
            toast.success("Login successful!");
            route.push("/auth/login");
            }
        }
        catch(error){
            setError("Signup failed. Try again.");
            toast.error("signup failed. Please try again.");
        }
    }


    return(
        <div className="flex items-center justify-center min-h-screen lg:h-dvh w-full bg-black opacity-95">
            <form onSubmit={handleSubmit} className="flex flex-col mb-4 w-1/3 px-10 opacity-100 bg-black h-fit py-8 rounded-[40px] border-[0.1px] border-gray-400 shadow-2xl">
                <h2 className="text-[30px] text-slate-100 font-semibold mb-6">Create an Account</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input 
                type="text"
                placeholder="FirstName"
                value={form.first_name}
                className="border-[1px] border-slate-300 p-3 mb-2 mt-2 2xl:mb-8 w-full text-[14px] rounded-[10px]"
                onChange={(e)=>setForm({...form , first_name:e.target.value})}
                />
                <input 
                type="text"
                placeholder="LastName"
                value={form.last_name} 
                className="border-[1px] border-slate-300 p-3 mb-2 mt-2 2xl:mb-8 w-full text-[14px] rounded-[10px]"
                onChange={(e)=>setForm({...form , last_name:e.target.value})}
                />
                <input 
                type="email"
                placeholder="Email"
                value={form.email} 
                className="border-[1px] border-slate-300 p-3 mb-2 mt-2 2xl:mb-8 w-full text-[14px] rounded-[10px]"
                onChange={(e)=>setForm({...form , email:e.target.value})}
                />
                <input 
                type="password"
                placeholder="Password"
                value={form.password} 
                className="border-[1px] border-slate-300 p-3 mb-4 mt-2 2xl:mb-8 w-full text-[14px] rounded-[10px]"
                onChange={(e)=>setForm({...form , password:e.target.value})}
                />
                <button className="py-1.5 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[16px] font-[500] tracking-[0.5px] rounded-[10px] text-black bg-slate-200 hover:bg-slate-600">Create Account</button>
                <Link href={"/auth/login"} className="mt-3 mx-auto">
                <p className="text-[8px] lg:text-[11px] xl:text-[14px] 2xl:text-[24px]">Already have an account ?<span className="text-[9px] lg:text-[12px] xl:text-[16px] 2xl:text-[28px] text-blue-600 border-b-[1px] border-blue-600 ml-2">Sign In</span></p>
                </Link>
            </form>
        </div>
    );
}