import React from "react";
import { useState, useEffect } from "react";
import { Moon, Sun, Home, Settings, User, ChevronDown, Menu, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { BACKEND_URL } from "@/pages/api/auth";
import { updateAccount } from "@/pages/api/auth";



type ThemeType = "light" | "dark";
type PageType = "home" | "settings" | "account" | "viewProfile";

interface SidebarContentProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  theme: ThemeType;
  toggleTheme: () => void;
  isCollapsed?: boolean;
  handleLogout: () => void;
}

interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  password:string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [theme, setTheme] = useState<ThemeType>("light");
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    const { token } = router.query;

    if (token && typeof token === "string") {
      localStorage.setItem("token", token);
      // Clean up URL (remove token query param)
      router.replace("/auth/dashboard");
    }
  }, [router]);
  

  const toggleTheme = (): void => {
    const newTheme: ThemeType = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    // Save theme preference to localStorage
    localStorage.setItem("theme", newTheme);
    
    // Apply theme to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    router.push("/auth/login");
  };

  
  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token || !user) {
      toast.error("You are not authenticated!");
      return;
    }

  
    try {
      console.log("Sending update with data:", {
        userId: user.id,
        data: {
          first_name: editFirstName,
          last_name: editLastName,
          email: editEmail,
          password: editPassword,
          updated_by: user.id,
        }
      });
      const response = await updateAccount({
        userId: user.id,
        data: {
          first_name: editFirstName,
          last_name: editLastName,
          email: editEmail,
          password: editPassword,
          updated_by: user.id,
        },
      });
  
      if (response.success) {
        toast.success(response.message || "Account updated successfully!");
        
        setUser({
          ...user,
          first_name: editFirstName,
          last_name: editLastName,
          email: editEmail,
        });
      } else {
        toast.error(response.message || "Update failed!");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong while updating.");
    }
  };

  // Load saved theme from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const savedTheme = localStorage.getItem("theme") as ThemeType;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

//update user details
  useEffect(() => {
    if (user) {
      setEditFirstName(user.first_name);
      setEditLastName(user.last_name);
      setEditEmail(user.email || "");
    }
  }, [user]);

  // Fetch user details
  useEffect(() => {
    if (typeof window === "undefined") return;

    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("Token is missing! Redirecting to login...");
        setLoading(false);
        router.push("/auth/login");
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
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [router]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!user) return <p className="p-8">No user data available.</p>;

  return (
    <div className={`min-h-screen flex ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-slate-900"}`}>
      {/* Sidebar - desktop */}
      <div className={`hidden md:flex flex-col border-r shadow-sm transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      } ${theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white border-gray-200"}`}>
        <SidebarContent 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          theme={theme} 
          toggleTheme={toggleTheme}
          isCollapsed={!isSidebarOpen}
          handleLogout={handleLogout}
        />
      </div>

      {/* Sidebar - mobile */}
      <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden m-2">
            <Menu size={18} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            theme={theme} 
            toggleTheme={toggleTheme}
            handleLogout={handleLogout}
          />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1">
        {/* Main header with toggle button */}
        <header className={`flex items-center p-3 border-b ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="hidden md:flex mr-4"
          >
          <Menu size={18} />
          </Button>
        </header>
        
        {/* Page content */}
        <div className="p-6">
          <Card className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}>
            <CardContent className="p-6">
              {currentPage === "home" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
                  <p>Hello, {user.first_name}! This is your dashboard home page.</p>
                </div>
              )}
              
              {currentPage === "viewProfile" && (
                <div className="max-w-md mx-auto mt-16 p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                {/* Avatar or Initials */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-white">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                </div>
              
                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                  Profile
                </h1>
              
                {/* Info Section */}
                <div className="space-y-5 text-gray-700 dark:text-gray-200">
                  <div className="flex justify-between">
                    <span className="font-semibold">Username:</span>
                    <span>{user.first_name} {user.last_name}</span>
                  </div>
              
                  {user.email && (
                    <div className="flex justify-between">
                      <span className="font-semibold">Email:</span>
                      <span>{user.email}</span>
                    </div>
                  )}
              
                  {/* Add more fields here */}
                </div>
              </div>
              
              
              )}
              
              {currentPage === "account" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Edit Account</h1>
                  <p>Update your account information here.</p>
                  {/* Form fields to edit account would go here */}
                  <form className="space-y-4" onSubmit={handleAccountUpdate}>
                    <div>
                      <label className="text-[14px]">First Name</label>
                      <input 
                      type="text" 
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]" />
                    </div>
                    <div>
                      <label className="text-[14px]">Last Name</label>
                      <input 
                      type="text" 
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]" />
                    </div>
                    <div>
                      <label className="text-[14px]">Email</label>
                      <input 
                      type="email" 
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]" />
                    </div>
                    <div>
                      <label className="text-[14px]">Password</label>
                      <input 
                      type="password" 
                      value={editPassword} 
                      onChange={(e) => setEditPassword(e.target.value)}
                      className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]" />
                    </div>
                    <Button 
                    type="submit"
                    className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600"
                    >Save Changes</Button>
                  </form>
                </div>
              )}
              
              {currentPage === "settings" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Settings</h1>
                  <p>Manage your application settings here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  currentPage, 
  setCurrentPage, 
  theme, 
  toggleTheme,
  isCollapsed = false,
  handleLogout
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Sidebar header */}
      <div className="p-4">
        {!isCollapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
        {isCollapsed && <div className="h-7" />} {/* Empty space to maintain alignment */}
      </div>
      <Separator />

      {/* Navigation links */}
      <nav className="flex-1 p-4 space-y-2">
        <Button
          variant={currentPage === "home" ? "secondary" : "ghost"}
          className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start"}`}
          onClick={() => setCurrentPage("home")}
        >
          <Home className={isCollapsed ? "" : "mr-2"} size={isCollapsed ? 20 : 16} />
          {!isCollapsed && <span>Home</span>}
        </Button>
        <Button
          variant={currentPage === "settings" ? "secondary" : "ghost"}
          className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start"}`}
          onClick={() => setCurrentPage("settings")}
        >
          <Settings className={isCollapsed ? "" : "mr-2"} size={isCollapsed ? 20 : 16} />
          {!isCollapsed && <span>Settings</span>}
        </Button>
      </nav>

      {/* User profile at bottom */}
      <div className="mt-auto p-4 space-y-2">
        <Separator className="mb-4" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-between"}`}>
              <div className="flex items-center">
                <User className={isCollapsed ? "" : "mr-2"} size={isCollapsed ? 20 : 16} />
                {!isCollapsed && <span>Profile</span>}
              </div>
              {!isCollapsed && <ChevronDown className="h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isCollapsed ? "center" : "end"}>
            <DropdownMenuItem 
              onClick={() => setCurrentPage("viewProfile")}
              className="cursor-pointer"
            >
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => setCurrentPage("account")}
              className="cursor-pointer"
            >
              Edit Account
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={toggleTheme}
              className="cursor-pointer"
            >
              <span>Toggle Theme</span>
              {theme === "light" ? (
                <Moon className="ml-2 h-4 w-4" />
              ) : (
                <Sun className="ml-2 h-4 w-4" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button
          variant="ghost"
          className={`w-full ${isCollapsed ? "justify-center" : "justify-start"} text-red-500`}
          onClick={handleLogout}
        >
          <LogOut className={isCollapsed ? "" : "mr-2"} size={isCollapsed ? 20 : 16} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;