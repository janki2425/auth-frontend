import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { registerUser } from "@/pages/api/auth";



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
        <div className="flex items-center justify-center min-h-screen w-full bg-slate-200">
            <form onSubmit={handleSubmit} className="flex flex-col mb-4 bg-white w-1/2 py-8 items-center rounded-[5px] shadow-2xl">
                <h2 className="text-[30px] text-slate-700 font-semibold mb-4">SIGN UP</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input 
                type="text"
                placeholder="FirstName"
                value={form.first_name}
                className="border-[1px] border-slate-300 p-2 mb-4 w-1/2 rounded-[10px]"
                onChange={(e)=>setForm({...form , first_name:e.target.value})}
                />
                <input 
                type="text"
                placeholder="LastName"
                value={form.last_name} 
                className="border-[1px] border-slate-300 p-2 mb-4 w-1/2 rounded-[10px]"
                onChange={(e)=>setForm({...form , last_name:e.target.value})}
                />
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
                <button className="py-2 px-4 rounded-[10px] text-white bg-slate-700 hover:bg-slate-600">Sign Up</button>
            </form>
        </div>
    );
}