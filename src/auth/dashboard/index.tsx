import axios from "axios";
import { useRouter } from "next/router";
import React, { useState,useEffect } from "react";


export default function dashboard(){
    const route = useRouter();
    const [user, setUser] = useState<{ email: string } | null>(null);


    if (!user) return <p>Loading...</p>;

    return(
        <div>
            <h1>Dashboard</h1>
            <p>Welcome , {user.email}</p>

            <button 
            onClick={()=>{
                localStorage.removeItem("token");
                route.push("/auth/login")
            }}
            className="py-2 px-4 rounded">Logout</button>
        </div>
    );
}