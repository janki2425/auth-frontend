import axios from "axios";
import { useRouter } from "next/router";
import React, { useState,useEffect } from "react";
import { BACKEND_URL } from "@/pages/api/auth";
import { Home, Settings, User, LogOut, ChevronDown,Sun,Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";

const Sidebar = ({ setPage,toggleDarkMode, }: { setPage: (page: string) => void;toggleDarkMode: () => void; }) => {
    const route = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        route.push("/auth/login");
      };
    return (
      <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <Button variant="ghost" className="mb-2" onClick={() => setPage("home")}> 
          <Home className="mr-2" /> Home
        </Button>
        <div className="relative">
            <Button 
            variant="ghost" 
            className="mb-2 flex w-full mx-auto"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}> 
                <User className="mr-2" /> Profile
            </Button>
            {isDropdownOpen && (
            <div className="absolute left-0 mt-1 w-full bg-gray-800 text-white rounded shadow-lg">
                <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => setPage("profile")}
                >
                View Profile
                </button>
                <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => setPage("profile")}
                >
                Edit Profile
                </button>
                <button
                className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700"
                onClick={toggleDarkMode}
                >
                <Moon className="hidden dark:block" size={18} />
                <Sun className="dark:hidden" size={18} />
                Toggle Theme
                </button>
            </div>
            )}
        </div>
        <Button variant="ghost" className="mb-2" onClick={() => setPage("settings")}> 
          <Settings className="mr-2" /> Settings
        </Button>
        <Button variant="ghost" className="mt-auto text-red-500" onClick={handleLogout}> 
          <LogOut className="mr-2" /> Logout
        </Button>
      </div>
    );
  };
  

export default function dashboard(){
    const route = useRouter();
    const [user, setUser] = useState<{ first_name: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log("Backend URL:", BACKEND_URL);
    const [page, setPage] = useState("home");

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
          return localStorage.getItem("theme") === "dark";
        }
        return false;
      });

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
    
        if (newMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };


    useEffect(() => {
        if (typeof window === "undefined") return;

        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
    
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token");
            console.log("Stored Token:", localStorage.getItem("token"));
    
            if (!token) {
                console.error("Token is missing! Redirecting to login...");
                setLoading(false);
                route.push("/auth/login");
                return;
            }
    
            try {
                const response = await axios.get(`${BACKEND_URL}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    },
                });


                if (response.data.user) {
                    setUser(response.data.user);
                } else {
                    setError("Invalid API response format.");
                }
            }catch (err) {
                setError("Failed to fetch user details.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserDetails();
    }, [route]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>No user data available.</p>;
    

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <Sidebar setPage={setPage} toggleDarkMode={toggleDarkMode} />
        <div className="flex-1 p-6">
            <Card className="bg-white dark:bg-gray-800 text-black dark:text-white">
            <CardContent className="p-4">
                {page === "home" && <h1 className="text-xl font-bold">Welcome to the Dashboard</h1>}
                {page === "profile" && <h1 className="text-xl font-bold">User Profile :  {user.first_name}</h1>}
                {page === "settings" && <h1 className="text-xl font-bold">Settings</h1>}
            </CardContent>
            </Card>
        </div>
        </div>
      );
}
