import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { loginUser } from "@/pages/api/auth";

export default function signin(){
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
        <div className="flex items-center justify-center min-h-screen w-full bg-slate-200">
            <form onSubmit={handleSubmit} className="flex flex-col mb-4 bg-white w-1/2 py-8 items-center rounded-[5px] shadow-2xl">
                <h2 className="text-[30px] text-slate-700 font-semibold mb-4">Login</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input 
                type="email"
                placeholder="Email"
                value={form.email} 
                className="border-[1px] border-slate-300 p-2 mb-4 w-1/2 rounded-[10px]"
                onChange={(e)=>setForm({...form , email:e.target.value})}
                />
                <input 
                type="password"
                placeholder="Password"
                value={form.password} 
                className="border-[1px] border-slate-300 p-2 mb-4 w-1/2 rounded-[10px]"
                onChange={(e)=>setForm({...form , password:e.target.value})}
                />
                <button className="py-2 px-4 rounded-[10px] text-white bg-slate-700 hover:bg-slate-600">Login</button>
            </form>
        </div>
    );
}