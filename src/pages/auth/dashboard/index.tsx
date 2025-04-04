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
  first_name: string;
  email?: string;
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
                <div>
                  <h1 className="text-2xl font-bold mb-4">User Profile</h1>
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold">Name</h2>
                      <p>{user.first_name}</p>
                    </div>
                    {user.email && (
                      <div>
                        <h2 className="text-lg font-semibold">Email</h2>
                        <p>{user.email}</p>
                      </div>
                    )}
                    {/* You can display other user details here */}
                  </div>
                </div>
              )}
              
              {currentPage === "account" && (
                <div>
                  <h1 className="text-2xl font-bold mb-4">Edit Account</h1>
                  <p>Update your account information here.</p>
                  {/* Form fields to edit account would go here */}
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