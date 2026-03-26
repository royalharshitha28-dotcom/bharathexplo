import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import EmergencyFab from "@/components/EmergencyFab";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Bharat Explorer - Smart Tourist Guide",
  description: "Discover the beauty, culture, and hidden gems of India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-slate-50 min-h-screen flex flex-col antialiased font-sans`} suppressHydrationWarning>
        <AuthProvider>
          <Navigation />
          <main className="flex-grow">{children}</main>
        </AuthProvider>
        <EmergencyFab />
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-center mt-20">
          <p className="font-medium text-lg text-slate-300">Bharat Explorer</p>
          <p className="mt-2 text-sm">© 2026 Bharat Explorer. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
