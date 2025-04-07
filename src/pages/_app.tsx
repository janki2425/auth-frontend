import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="1058468186786-67qhg5de7leufba50bd2dcdl31d6qkln.apps.googleusercontent.com">
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </GoogleOAuthProvider>
  );
}
