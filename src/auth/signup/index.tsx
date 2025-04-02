import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";


export default function signup(){
    const [form , setForm] = useState({first_name:"",last_name:"",email:"",password:""});
    const [error , setError] = useState("");
    const route = useRouter();

    const handleSubmit = async(e : React.FormEvent)=>{
        e.preventDefault();
        setError("");

        try{
            await axios.post("http://localhost:3000/api/register",form);
            route.push("/api/login");
        }
        catch(error){
            setError("Signup failed. Try again.");
        }
    }


    return(
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="space-y-2">
                <h2 className="text-xl font-semibold mb-4">SIGN UP</h2>
                {error && <p className="text-red-600">{error}</p>}
                <input 
                type="text"
                placeholder="FirstName"
                value={form.first_name}
                className="border-none p-2" 
                onChange={(e)=>setForm({...form , first_name:e.target.value})}
                />
                <input 
                type="text"
                placeholder="LastName"
                value={form.last_name} 
                className="border-none p-2"
                onChange={(e)=>setForm({...form , last_name:e.target.value})}
                />
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
                <button className="py-2 px-4 rounded">Sign Up</button>
            </form>
        </div>
    );
}