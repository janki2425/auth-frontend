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
        <div className="flex items-center justify-center min-h-screen lg:h-dvh w-full bg-black">
            <form onSubmit={handleSubmit} className="flex flex-col bg-black w-[382px] px-6 h-fit py-6 justify-center rounded-[10px] outline-[0.5px]">
                <h2 className="text-[24px] text-slate-100 mb-6 font-semibold">Create an Account</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input 
                type="text"
                placeholder="FirstName"
                value={form.first_name}
                className="outline-[0.5px] px-3 py-1.5 mb-3 mt-1 2xl:mb-8 w-full bg-black text-[16px] rounded-[5px]"
                onChange={(e)=>setForm({...form , first_name:e.target.value})}
                />
                <input 
                type="text"
                placeholder="LastName"
                value={form.last_name} 
                className="outline-[0.5px] px-3 py-1.5 mb-3 mt-1 2xl:mb-8 w-full bg-black text-[16px] rounded-[5px]"
                onChange={(e)=>setForm({...form , last_name:e.target.value})}
                />
                <input 
                type="email"
                placeholder="Email"
                value={form.email} 
                className="outline-[0.5px] px-3 py-1.5 mb-3 mt-1 2xl:mb-8 w-full bg-black text-[16px] rounded-[5px]"
                onChange={(e)=>setForm({...form , email:e.target.value})}
                />
                <input 
                type="password"
                placeholder="Password"
                value={form.password} 
                className="outline-[0.5px] px-3 py-1.5 mb-8 mt-1 2xl:mb-8 w-full bg-black text-[16px] rounded-[5px]"
                onChange={(e)=>setForm({...form , password:e.target.value})}
                />
                <button className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600">Create Account</button>
                <Link href={"/auth/login"} className="mt-3 mx-auto">
                <p className="text-[14px]">Already have an account ?<span className="text-[14px] border-b-[1px] ml-1 pb-[1px]">Sign In</span></p>
                </Link>
            </form>
        </div>
    );
}