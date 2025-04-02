import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerUser } from "@/pages/api/auth";
import Link from "next/link";

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
            console.log("Signup successful:", response);
            route.push("/auth/login");
            }
        }
        catch(error){
            setError("Signup failed. Try again.");
        }
    }


    return(
        <div className="flex items-center justify-center min-h-screen lg:h-dvh w-full bg-slate-100">
            <form onSubmit={handleSubmit} className="flex flex-col mb-4 bg-white w-1/2 h-fit py-4 lg:py-8 xl:py-16 2xl:py-20 items-center rounded-[5px] shadow-2xl">
                <h2 className="text-[20px] lg:text-[30px] xl:text-[40px] 2xl:text-[80px] text-slate-700 font-semibold mb-4 xl:mb-8 xl:mt-5 2xl:mb-14 2xl:mt-12">SIGN UP</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input 
                type="text"
                placeholder="FirstName"
                value={form.first_name}
                className="border-[1px] border-slate-300 p-2 2xl:p-3 mb-4 lg:mt-4 2xl:mb-12 w-1/2 text-[10px] lg:text-[15px] xl:text-[20px] 2xl:text-[35px] rounded-[10px]"
                onChange={(e)=>setForm({...form , first_name:e.target.value})}
                />
                <input 
                type="text"
                placeholder="LastName"
                value={form.last_name} 
                className="border-[1px] border-slate-300 p-2 2xl:p-3 mb-4 2xl:mb-12 w-1/2 text-[10px] lg:text-[15px] xl:text-[20px] 2xl:text-[35px] rounded-[10px]"
                onChange={(e)=>setForm({...form , last_name:e.target.value})}
                />
                <input 
                type="email"
                placeholder="Email"
                value={form.email} 
                className="border-[1px] border-slate-300 p-2 2xl:p-3 mb-4 2xl:mb-12 w-1/2 text-[10px] lg:text-[15px] xl:text-[20px] 2xl:text-[35px] rounded-[10px]"
                onChange={(e)=>setForm({...form , email:e.target.value})}
                />
                <input 
                type="password"
                placeholder="Password"
                value={form.password} 
                className="border-[1px] border-slate-300 p-2 2xl:p-3 mb-6 lg:mb-9 xl:mb-12 2xl:mb-18 w-1/2 text-[10px] lg:text-[15px] xl:text-[20px] 2xl:text-[35px] rounded-[10px]"
                onChange={(e)=>setForm({...form , password:e.target.value})}
                />
                <button className="py-1.5 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 rounded-[10px] text-[14px] lg:text-[16px] xl:text-[22px] 2xl:text-[40px] text-white bg-slate-700 hover:bg-slate-600">Sign Up</button>
                <Link href={"/auth/login"} className="mt-3">
                <p className="text-[8px] lg:text-[11px] xl:text-[14px] 2xl:text-[24px]">Already have an account ?<span className="text-[10px] lg:text-[12px] xl:text-[16px] 2xl:text-[28px] text-blue-600 border-b-[1px] ml-2">Sign In</span></p>
                </Link>
            </form>
        </div>
    );
}