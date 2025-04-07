export const BACKEND_URL = "https://badc-122-170-151-81.ngrok-free.app";

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


export const forgetPassword = async ({ email }: { email: string }) => {
  const res = await fetch(`${BACKEND_URL}/api/forget-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await res.json();
};


export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await fetch(`${BACKEND_URL}/api/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      otp: data.code,
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    }),
  });
  return await res.json();
};