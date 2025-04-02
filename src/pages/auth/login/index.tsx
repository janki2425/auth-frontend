import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function signin(){
    const [form , setForm] = useState({email:"",password:""});
    const [error , setError] = useState("");
    const route = useRouter();

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        setError("");
        

        try{
            const res = await axios.post("http://localhost:3000/api/login");
            localStorage.setItem("token" , res.data.token)
            route.push("/dashboard");
        }
        catch(error){
            setError("Invalid User")
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="space-y-2">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input 
                type="email"
                placeholder="Email"
                value={form.email} 
                className="border-none p-2"
                onChange={(e)=>setForm({...form , email:e.target.value})}
                />
                <input 
                type="password"
                placeholder="Password"
                value={form.password} 
                className="border-none p-2"
                onChange={(e)=>setForm({...form , password:e.target.value})}
                />
                <button className="py-2 px-4 rounded">Login</button>
            </form>
        </div>
    );
}