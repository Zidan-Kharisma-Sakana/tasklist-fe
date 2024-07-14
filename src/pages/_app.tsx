import { NavigationBar } from "@/components/navigation";
import { AuthProvider } from "@/lib/contexts/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      
      <Toaster />
      <div className="min-h-screen px-12 py-6 lg:px-24 lg:py-12 text-white">
        <NavigationBar />
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
