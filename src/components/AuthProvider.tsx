import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
  session?: AppProps["pageProps"]["session"];
}

export default function AuthProvider({ 
  children,
  session
}: AuthProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}