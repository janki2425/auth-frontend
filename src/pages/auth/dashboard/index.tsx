import axios from "axios";
import { useRouter } from "next/router";
import React, { useState,useEffect } from "react";
import { BACKEND_URL } from "@/pages/api/auth";


export default function dashboard(){
    const route = useRouter();
    const [user, setUser] = useState<{ first_name: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log("Backend URL:", BACKEND_URL);


    useEffect(()=>{
        if (typeof window === "undefined") return;

        console.log("🔹 Token being sent:", localStorage.getItem("token"));

        const fetchUserDetails = async () =>{
            const token = localStorage.getItem("token");
            console.log("token : ",token);
            
            if (!token) {
                console.error("Token is missing! Redirecting to login...");
                setLoading(false);
                route.push("/auth/login");
                return;
            }

            try{
                
                const response = await axios.get(`${BACKEND_URL}/api/user`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                
                if (response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(response.data);
                }
            }catch (err) {
                setError("Failed to fetch user details.");
                console.error("Error fetching user details:", err);
            }finally {
                setLoading(false);
            }
        }
        fetchUserDetails();
    },[route])


    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>No user data available.</p>;
    console.log("username : ",user.first_name);
    

    return(
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-slate-100">
            <h1 className="text-[40px] lg:text-[50px] xl:text-[60px] 2xl:text-[100px] text-slate-700 font-semibold mb-5">Dashboard</h1>
            <p className="text-[20px] lg:text-[30px] xl:text-[35px] 2xl:text-[60px] text-slate-700 mb-3">Welcome, {user.first_name}</p>

            <button 
            onClick={()=>{
                localStorage.removeItem("token");
                route.push("/auth/login")
            }}
            className="py-2 px-4 xl:py-3 xl:px-5 2xl:py-4 2xl:px-7 rounded-[10px] text-white text-[15px] lg:text-[20px] xl:text-[25px] 2xl:text-[40px] bg-red-600 hover:bg-red-700">Logout</button>
        </div>
    );
}