import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "@/pages/api/auth";
import { forgetPassword,resetPassword,completePasswordReset } from "@/pages/api/auth";

export default function reset(){
    const [error , setError]= useState("");
    const route = useRouter();
    const [isEmailExisted , setIsEmailExisted] = useState(false);
    const [email , setEmail] =useState("");
    const [code , setCode] =useState("");
    const [password , setPassword] =useState("");
    const [confirmPassword , setConfirmPassword] =useState("");
    const [isCode , SetIsCode] = useState(false);
    const [loading,setLoading]=useState(false);

    const checkEmail = async(email:string)=>{
        setLoading(true);
        setError("");

        try{
            console.log("Sending email:", email);
            const res=await forgetPassword(email)
            console.log("Response:", res);

            if (res.message === "OTP sent to your email") {
                setIsEmailExisted(true);
                toast.success("Verification code sent to email.");
              } else {
                setError("Email not found");
                setIsEmailExisted(false);
              }

        }catch(error){
            console.error("Error:", error);
            setIsEmailExisted(false);
            setError("Failed to send email. Please try again.");
            toast.error("Failed to send email. Please try again.");
        }
        finally{
            setLoading(false);
        }
    }

    const verifyCode = async(code:string)=>{
        setLoading(true);
        setError("");

        try{
            console.log("Verifying OTP:", code, "for email:", email);
            const res=await resetPassword(email,code)
            console.log("Response:", res);

            if (res.error) {
                throw new Error(res.error);
            }
    
            toast.success("OTP verified");
            SetIsCode(true);

        }catch(error){
            console.error("Error:", error);
            setError("Failed to verify OTP. Please try again.");
            toast.error("Code verification failed");
        }
        finally{
            setLoading(false);
        }
    }


    const handleSubmit = async(e : React.FormEvent)=>{
        e.preventDefault();
        setError("");


        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
          }

        if(isCode){
            setLoading(true);
            try{

                const res = await completePasswordReset(email, code, password);

                if (res.message === "Password reset successful") {
                    toast.success("Password reset successfully");
                    route.push("/auth/login");
                }
                else {
                    setError("Reset Password failed");
                    toast.error("Reset Password failed");
                  }
            }
            catch(error){
                setError("Reset Password failed");
                toast.error("Reset Password failed");
            }
        }
    }
    return(
        <div className="flex justify-center items-center w-full min-h-screen bg-black">
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col bg-black w-[382px] px-6 h-fit py-6 justify-center rounded-[10px] outline-[0.5px]">
                <h2 className="text-[24px] mb-1 text-slate-100 font-semibold">Forget Password</h2>
                <p className="mb-4 opacity-60 text-[14px]">Enter your email to reset password</p>
                {error && <p className="text-red-600">{error}</p>}
                <label htmlFor="email" className="text-[14px]">Email</label>
                <input 
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="E@example.com"
                disabled={isEmailExisted}
                className="outline-[0.5px] px-3 py-1.5 mb-6 mt-1 2xl:mb-8 w-full bg-black text-[16px] rounded-[5px]"
                />
                
                {isEmailExisted &&
                    <div>
                        <p className="opacity-60 text-[14px]">Verification code has been sent to your email</p>
                        <label htmlFor="code" className="text-[14px]">Enter Verification Code</label>
                        <input 
                        id="code"
                        name="code"
                        type="text"
                        value={code}
                        minLength={6}
                        maxLength={6}
                        onChange={(e)=>setCode(e.target.value)}
                        className="outline-[0.5px] w-full px-3 py-1.5 mb-6 mt-1 2xl:mb-8 bg-black text-[16px] rounded-[5px]"
                        />
                    </div>
                    }
                    {isCode &&
                    <div>
                    <label htmlFor="password" className="text-[14px]">Password</label>
                    <input 
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]"
                    />
                    <label htmlFor="confirm-password" className="text-[14px]">Confirm Password</label>
                    <input 
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    className="outline-[0.5px] px-3 py-1.5 mt-1 mb-7 lg:mb-6 xl:mb-8 2xl:mb-12 w-full text-[16px] rounded-[5px]"
                    />
                </div>
                }

                {!isEmailExisted && (
                <button 
                onClick={() => checkEmail(email)}
                className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600">check Email</button>
                )}
                {isEmailExisted && !isCode && (
                <button 
                onClick={() => verifyCode(code)}
                className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600">Verify Code</button>
                )}
                {isCode && (
                <button 
                type="submit"
                className="py-2 px-3 xl:py-2 xl:px-5 2xl:py-3 2xl:px-8 text-[14px] font-[500] tracking-[0.5px] rounded-[6px] text-black bg-slate-200 hover:bg-slate-600">Set Password</button>
                )}
            </form>
        </div>
    );
}