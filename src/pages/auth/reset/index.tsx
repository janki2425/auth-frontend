// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { BACKEND_URL } from "@/pages/api/auth";
// import { forgetPassword,resetPassword } from "@/pages/api/auth";

// export default function reset(){
//     const [form , setForm] = useState({email:"",code:"",password:"",confirmPassword:""});
//     const [step, setStep] = useState<"email" | "otp" | "reset">("email");
//     const [error , setError]= useState("");
//     const router = useRouter();
//     const [isEmailExisted , setIsEmailExisted] = useState(false);
//     // const [email , setEmail] =useState("");
//     // const [code , setCode] =useState("");
//     // const [password , setPassword] =useState("");
//     // const [confirmPassword , setConfirmPassword] =useState("");
//     const [isCode , SetIsCode] = useState(false);
//     const [loading,setLoading]=useState(false);

//     // const checkEmail = async(e : React.FormEvent)=>{
//     //     e.preventDefault;
//     //     setLoading(true);
//     //     setError("");

//     //     try{
//     //         console.log("Sending email:", form);
//     //         const res=await forgetPassword(form)
//     //         console.log("Response:", res);

//     //         if (res.message === "OTP sent to your email") {
//     //             setIsEmailExisted(true);
//     //             toast.success("Verification code sent to email.");
//     //           } else {
//     //             setError("Email not found");
//     //             setIsEmailExisted(false);
//     //           }

//     //     }catch(error){
//     //         console.error("Error:", error);
//     //         setIsEmailExisted(false);
//     //         setError("Failed to send email. Please try again.");
//     //         toast.error("Failed to send email. Please try again.");
//     //     }
//     //     finally{
//     //         setLoading(false);
//     //     }
//     // }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//       };



//       const handleCheckEmail = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
    
//         try {
//           const res = await forgetPassword({ email: form.email });
//           if (res.message === "OTP sent to your email") {
//             toast.success("Verification code sent to email.");
//             setStep("otp");
//           } else {
//             setError("Email not found");
//           }
//         } catch (err) {
//           toast.error("Failed to send email. Try again.");
//         } finally {
//           setLoading(false);
//         }
//       };

//       const handleVerifyCode = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
    
//         try {
//           const res = await resetPassword({
//             email: form.email,
//             code: form.code,
//             password: "",
//             confirmPassword: "",
//           });
    
//           if (res.error) throw new Error(res.error);
    
//           toast.success("OTP verified");
//           setStep("reset");
//         } catch (err) {
//           toast.error("Code verification failed");
//         } finally {
//           setLoading(false);
//         }
//       };
    

//     // const verifyCode = async(e : React.FormEvent)=>{
//     //     e.preventDefault;
//     //     setLoading(true);
//     //     setError("");

//     //     try{
//     //         console.log("Verifying OTP:", code, "for email:", email);
//     //         const res=await resetPassword(form)
//     //         console.log("Response:", res);

//     //         if (res.error) {
//     //             throw new Error(res.error);
//     //         }
    
//     //         toast.success("OTP verified");
//     //         SetIsCode(true);

//     //     }catch(error){
//     //         console.error("Error:", error);
//     //         setError("Failed to verify OTP. Please try again.");
//     //         toast.error("Code verification failed");
//     //     }
//     //     finally{
//     //         setLoading(false);
//     //     }
//     // }


//     // const handleSubmit = async(e : React.FormEvent)=>{
//     //     e.preventDefault();
//     //     setError("");


//     //     if (password !== confirmPassword) {
//     //         setError("Passwords do not match");
//     //         toast.error("Passwords do not match");
//     //         return;
//     //       }

//     //     if(isCode){
//     //         setLoading(true);
//     //         try{

//     //             // const res = await completePasswordReset(email, code, password);
//     //             const res=await resetPassword(form);

//     //             if (res.message === "Password reset successful") {
//     //                 toast.success("Password reset successfully");
//     //                 route.push("/auth/login");
//     //             }
//     //             else {
//     //                 setError("Reset Password failed");
//     //                 toast.error("Reset Password failed");
//     //               }
//     //         }
//     //         catch(error){
//     //             setError("Reset Password failed");
//     //             toast.error("Reset Password failed");
//     //         }
//     //     }
//     // }

//     const handleResetPassword = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
    
//         if (form.password !== form.confirmPassword) {
//           toast.error("Passwords do not match");
//           return;
//         }
    
//         setLoading(true);
//         try {
//           const res = await resetPassword(form);
//           if (res.message === "Password reset successful") {
//             toast.success("Password reset successfully");
//             router.push("/auth/login");
//           } else {
//             toast.error("Reset Password failed");
//           }
//         } catch (err) {
//           toast.error("Reset Password failed");
//         } finally {
//           setLoading(false);
//         }
//       };
    
//     return(
//         <div className="flex justify-center items-center w-full min-h-screen bg-black">
//             <form 
//             // onSubmit={handleSubmit}
//             onSubmit={
//                 step === "email"
//                   ? handleCheckEmail
//                   : step === "otp"
//                   ? handleVerifyCode
//                   : handleResetPassword
//               }
//             className="flex flex-col bg-black w-[382px] px-6 h-fit py-6 justify-center rounded-[10px] outline-[0.5px]">
//                 <h2 className="text-[24px] mb-1 text-slate-100 font-semibold">Forget Password</h2>
//                 {/* <p className="mb-4 opacity-60 text-[14px]">Enter your email to reset password</p> */}
//                 <p className="mb-4 opacity-60 text-[14px]">
//                 {step === "email"
//                     ? "Enter your email to reset password"
//                     : step === "otp"
//                     ? "Enter the verification code sent to your email"
//                     : "Set your new password"}
//                 </p>
//                 {error && <p className="text-red-600">{error}</p>}
//                 {(step === "email" || step === "otp" || step === "reset") && (
//                 <>
//                 <label htmlFor="email" className="text-[14px]">Email</label>
//                 <input 
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="E@example.com"
//                 disabled={isEmailExisted}
//                 className="outline-[0.5px] px-3 py-1.5 mb-6 mt-1 2xl:mb-8 w-full bg-black text-[16px] rounded-[5px]"
//                 />
//                 </>
//                 )}
//                 {step === "otp" && (
//                     <>
//                     <label htmlFor="code" className="text-[14px]">Enter Verification Code</label>
//                     <input 
//                     id="code"
//                     name="code"
//                     type="text"
//                     minLength={6}
//                     maxLength={6}
//                     value={form.email}
//                     onChange={handleChange}
//                     className="outline-[0.5px] w-full px-3 py-1.5 mb-6 mt-1 2xl:mb-8 bg-black text-[16px] rounded-[5px]"
//                     />
//                 </>
//                 )}
//                    {step === "reset" && (
//                     <>
//                     <label htmlFor="password" className="text-[14px]">Password</label>
//                     <input 
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]"
//                     />
//                     <label htmlFor="confirm-password" className="text-[14px]">Confirm Password</label>
//                     <input 
//                     id="confirm-password"
//                     name="confirm-password"
//                     type="password"
//                     value={form.confirmPassword}
//                     onChange={handleChange}
//                     className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]"
//                     />
//                 </>
//                    )}


//                 <button
//                 type="submit"
//                 disabled={loading}
//                 className="py-2 px-3 mt-4 text-[14px] font-medium rounded-[6px] text-black bg-slate-200 hover:bg-slate-600"
//                 >
//                 {step === "email"
//                     ? "Check Email"
//                     : step === "otp"
//                     ? "Verify Code"
//                     : "Set Password"}
//                 </button>

//                 {/* {!isEmailExisted && (
//                 <button 
//                 onClick={() => setForm(form)}
//                 className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600">check Email</button>
//                 )}
//                 {isEmailExisted && !isCode && (
//                 <button 
//                 onClick={() => setForm(form)}
//                 className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600">Verify Code</button>
//                 )}
//                 {isCode && (
//                 <button 
//                 type="submit"
//                 className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600">Set Password</button>
//                 )} */}
//             </form>
//         </div>
//     );
// }


import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { forgetPassword, resetPassword } from "@/pages/api/auth";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState<"email" | "reset">("email");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await forgetPassword({ email: form.email });
      if (res.message === "OTP sent to your email") {
        toast.success("OTP sent to your email");
        setStep("reset");
      } else {
        toast.error(res.error || "Email not found");
      }
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password:", form.password);
    console.log("Confirm Password:", form.confirmPassword);
    console.log("Equal?", form.password === form.confirmPassword);
    if (form.password.trim() !== form.confirmPassword.trim()) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(form);
      if (res.message === "Password reset successful") {
        toast.success("Password reset successful");
        router.push("/auth/login");
      } else {
        toast.error(res.error || "Password reset failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <form
        onSubmit={step === "email" ? handleEmailSubmit : handleResetSubmit}
        className="flex flex-col w-[380px] bg-black px-6 py-6 rounded-[10px] border border-slate-700"
      >
        <h2 className="text-[24px] text-white font-semibold mb-6">
          Reset Password
        </h2>

        {step === "email" && (
          <>
            <label className="text-white text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="outline-none px-3 py-2 mb-4 w-full bg-black border border-slate-600 rounded text-white"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <label className="text-white text-sm mb-1">OTP Code</label>
            <input
              name="code"
              type="text"
              maxLength={6}
              value={form.code}
              onChange={handleChange}
              className="outline-none px-3 py-2 mb-4 w-full bg-black border border-slate-600 rounded text-white"
              required
            />

            <label className="text-white text-sm mb-1">New Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="outline-none px-3 py-2 mb-4 w-full bg-black border border-slate-600 rounded text-white"
              required
            />

            <label className="text-white text-sm mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="outline-none px-3 py-2 mb-6 w-full bg-black border border-slate-600 rounded text-white"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-white text-black rounded hover:bg-gray-200 transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
