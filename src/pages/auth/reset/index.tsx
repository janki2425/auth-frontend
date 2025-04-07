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
