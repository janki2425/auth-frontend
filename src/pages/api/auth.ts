export const BACKEND_URL = "https://d212-122-182-203-103.ngrok-free.app";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  token?: string;
  error?: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return await response.json();
  } catch (error) {
    return { message: "Error logging in", error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return await response.json();
  } catch (error) {
    return { message: "Error registering user", error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const forgetPassword = async (email:string): Promise<AuthResponse> =>{
  try{
    const response = await fetch(`${BACKEND_URL}/api/forget-Password`,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email}),
    })
    if (!response.ok) {
      throw new Error("Email not Exist!");
    }
    return await response.json();
  }catch (error) {
    return { message: "Error verifing Email", error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export const resetPassword = async (email: string,code:string): Promise<AuthResponse> =>{
  try{
    const response = await fetch(`${BACKEND_URL}/api/reset-password`,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email,code}),
    })
    if (!response.ok) {
      throw new Error("OTP not matched!");
    }
    return await response.json();
  }catch (error) {
    return { message: "Error verifing OTP", error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export const completePasswordReset = async (email: string, code: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, password }),
    });
    
    if (!response.ok) {
      throw new Error("Password reset failed");
    }
    
    return await response.json();
  } catch (error) {
    return { message: "Error resetting password", error: error instanceof Error ? error.message : "Unknown error" };
  }
};