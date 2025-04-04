// import axios from "axios";
// import { useRouter } from "next/router";
// import React, { useState,useEffect } from "react";
// import { BACKEND_URL } from "@/pages/api/auth";
// import { Home, Settings, User, LogOut, ChevronDown,Sun,Moon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "react-toastify";

// const Sidebar = ({ setPage,toggleDarkMode, }: { setPage: (page: string) => void;toggleDarkMode: () => void; }) => {
//     const route = useRouter();
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         toast.success("Logged out successfully!");
//         route.push("/auth/login");
//       };
//     return (
//       <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4">
//         <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//         <Button variant="ghost" className="mb-2" onClick={() => setPage("home")}> 
//           <Home className="mr-2" /> Home
//         </Button>
//         <div className="relative">
//             <Button 
//             variant="ghost" 
//             className="mb-2 flex w-full mx-auto"
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}> 
//                 <User className="mr-2" /> Profile
//             </Button>
//             {isDropdownOpen && (
//             <div className="absolute left-0 mt-1 w-full bg-gray-800 text-white rounded shadow-lg">
//                 <button
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-700"
//                 onClick={() => setPage("profile")}
//                 >
//                 View Profile
//                 </button>
//                 <button
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-700"
//                 onClick={() => setPage("profile")}
//                 >
//                 Edit Profile
//                 </button>
//                 <button
//                 className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700"
//                 onClick={toggleDarkMode}
//                 >
//                 <Moon className="hidden dark:block" size={18} />
//                 <Sun className="dark:hidden" size={18} />
//                 Toggle Theme
//                 </button>
//             </div>
//             )}
//         </div>
//         <Button variant="ghost" className="mb-2" onClick={() => setPage("settings")}> 
//           <Settings className="mr-2" /> Settings
//         </Button>
//         <Button variant="ghost" className="mt-auto text-red-500" onClick={handleLogout}> 
//           <LogOut className="mr-2" /> Logout
//         </Button>
//       </div>
//     );
//   };
  

// export default function dashboard(){
//     const route = useRouter();
//     const [user, setUser] = useState<{ first_name: string } | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     console.log("Backend URL:", BACKEND_URL);
//     const [page, setPage] = useState("home");

//     const [darkMode, setDarkMode] = useState(() => {
//         if (typeof window !== "undefined") {
//           return localStorage.getItem("theme") === "dark";
//         }
//         return false;
//       });

//     const toggleDarkMode = () => {
//         const newMode = !darkMode;
//         setDarkMode(newMode);
//         localStorage.setItem("theme", newMode ? "dark" : "light");
    
//         if (newMode) {
//             document.documentElement.classList.add("dark");
//         } else {
//             document.documentElement.classList.remove("dark");
//         }
//     };


//     useEffect(() => {
//         if (typeof window === "undefined") return;

//         if (localStorage.getItem("theme") === "dark") {
//             document.documentElement.classList.add("dark");
//           } else {
//             document.documentElement.classList.remove("dark");
//           }
    
//         const fetchUserDetails = async () => {
//             const token = localStorage.getItem("token");
//             console.log("Stored Token:", localStorage.getItem("token"));
    
//             if (!token) {
//                 console.error("Token is missing! Redirecting to login...");
//                 setLoading(false);
//                 route.push("/auth/login");
//                 return;
//             }
    
//             try {
//                 const response = await axios.get(`${BACKEND_URL}/api/user`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json",
//                         "ngrok-skip-browser-warning": "true"
//                     },
//                 });


//                 if (response.data.user) {
//                     setUser(response.data.user);
//                 } else {
//                     setError("Invalid API response format.");
//                 }
//             }catch (err) {
//                 setError("Failed to fetch user details.");
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchUserDetails();
//     }, [route]);


//     if (loading) return <p>Loading...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;
//     if (!user) return <p>No user data available.</p>;
    

//     return (
//         <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
//         <Sidebar setPage={setPage} toggleDarkMode={toggleDarkMode} />
//         <div className="flex-1 p-6">
//             <Card className="bg-white dark:bg-gray-800 text-black dark:text-white">
//             <CardContent className="p-4">
//                 {page === "home" && <h1 className="text-xl font-bold">Welcome to the Dashboard</h1>}
//                 {page === "profile" && <h1 className="text-xl font-bold">User Profile :  {user.first_name}</h1>}
//                 {page === "settings" && <h1 className="text-xl font-bold">Settings</h1>}
//             </CardContent>
//             </Card>
//         </div>
//         </div>
//       );
// }



// import React from "react";
// import { useState } from "react";
// import { Moon, Sun, Home, Settings, User, ChevronDown, Menu, X } from "lucide-react";

// // Import shadcn components
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

// type ThemeType = "light" | "dark";
// type PageType = "home" | "settings" | "account";

// interface SidebarContentProps {
//   currentPage: PageType;
//   setCurrentPage: (page: PageType) => void;
//   theme: ThemeType;
//   toggleTheme: () => void;
//   isCollapsed?: boolean;
// }

// const Dashboard: React.FC = () => {
//   const [theme, setTheme] = useState<ThemeType>("light");
//   const [currentPage, setCurrentPage] = useState<PageType>("home");
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
//   const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);

//   const toggleTheme = (): void => {
//     const newTheme: ThemeType = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     // In a real app, you'd apply the theme to the document or use a theme provider
//     document.documentElement.classList.toggle("dark");
//   };

//   const toggleSidebar = (): void => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className={`min-h-screen flex ${theme === "dark" ? "bg-slate-950 text-slate-50" : "bg-white text-slate-900"}`}>
//       {/* Sidebar - desktop */}
//       <div className={`hidden md:flex flex-col border-r shadow-sm transition-all duration-300 ${
//         isSidebarOpen ? "w-64" : "w-16"
//       }`}>
//         <SidebarContent 
//           currentPage={currentPage} 
//           setCurrentPage={setCurrentPage} 
//           theme={theme} 
//           toggleTheme={toggleTheme}
//           isCollapsed={!isSidebarOpen}
//         />
//       </div>

//       {/* Sidebar - mobile */}
//       <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
//         <SheetTrigger asChild>
//           <Button variant="outline" size="icon" className="md:hidden m-2">
//             <Menu size={18} />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="w-64 p-0">
//           <SidebarContent 
//             currentPage={currentPage} 
//             setCurrentPage={setCurrentPage} 
//             theme={theme} 
//             toggleTheme={toggleTheme} 
//           />
//         </SheetContent>
//       </Sheet>

//       {/* Main content */}
//       <div className="flex-1">
//         {/* Main header with toggle button */}
//         <header className="flex items-center p-4 border-b">
//           <Button 
//             variant="ghost" 
//             size="icon" 
//             onClick={toggleSidebar}
//             className="hidden md:flex mr-4"
//           >
//             {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
//           </Button>
//           <h1 className="text-xl font-semibold">Dashboard</h1>
//         </header>
        
//         {/* Page content */}
//         <div className="p-6">
//           {currentPage === "home" && <HomePage />}
//           {currentPage === "settings" && <SettingsPage />}
//           {currentPage === "account" && <AccountPage />}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SidebarContent: React.FC<SidebarContentProps> = ({ 
//   currentPage, 
//   setCurrentPage, 
//   theme, 
//   toggleTheme,
//   isCollapsed = false
// }) => {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Sidebar header */}
//       <div className="p-4">
//         {!isCollapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
//         {isCollapsed && <div className="h-8" />} {/* Empty space to maintain alignment */}
//       </div>
//       <Separator />

//       {/* Navigation links */}
//       <nav className="flex-1 p-4 space-y-2">
//         <Button
//           variant={currentPage === "home" ? "secondary" : "ghost"}
//           className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start"}`}
//           onClick={() => setCurrentPage("home")}
//         >
//           <Home className={isCollapsed ? "" : "mr-2"} size={isCollapsed ? 20 : 16} />
//           {!isCollapsed && <span>Home</span>}
//         </Button>
//         <Button
//           variant={currentPage === "settings" ? "secondary" : "ghost"}
//           className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start"}`}
//           onClick={() => setCurrentPage("settings")}
//         >
//           <Settings className={isCollapsed ? "" : "mr-2"} size={isCollapsed ? 20 : 16} />
//           {!isCollapsed && <span>Settings</span>}
//         </Button>
//       </nav>

//       {/* User profile at bottom */}
//       <div className="mt-auto p-4">
//         <Separator className="mb-4" />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-between"}`}>
//               <div className="flex items-center">
//                 <User className={isCollapsed ? "" : "mr-2"} size={isCollapsed ? 20 : 16} />
//                 {!isCollapsed && <span>Profile</span>}
//               </div>
//               {!isCollapsed && <ChevronDown className="h-4 w-4" />}
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align={isCollapsed ? "center" : "end"}>
//             <DropdownMenuItem 
//               onClick={() => setCurrentPage("account")}
//               className="cursor-pointer"
//             >
//               Edit Account
//             </DropdownMenuItem>
//             <DropdownMenuItem 
//               onClick={toggleTheme}
//               className="cursor-pointer"
//             >
//               <span>Toggle Theme</span>
//               {theme === "light" ? (
//                 <Moon className="ml-2 h-4 w-4" />
//               ) : (
//                 <Sun className="ml-2 h-4 w-4" />
//               )}
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// };

// const HomePage: React.FC = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Home</h1>
//       <p>Welcome to your dashboard. This is the home page content.</p>
//     </div>
//   );
// };

// const SettingsPage: React.FC = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Settings</h1>
//       <p>Manage your application settings here.</p>
//     </div>
//   );
// };

// const AccountPage: React.FC = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit Account</h1>
//       <p>Update your account information here.</p>
//     </div>
//   );
// };

// export default Dashboard;



import React from "react";
import { useState, useEffect } from "react";
import { Moon, Sun, Home, Settings, User, ChevronDown, Menu, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";

// Import shadcn components
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