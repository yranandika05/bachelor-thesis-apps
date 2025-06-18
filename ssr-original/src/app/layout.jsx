import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import Navbar from "@/components/Navbar";
import EnvironmentBadge from "@/components/EnvirontmentBadge";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
    title: "SSR Original",
    description: "This is the SSR version",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <EnvironmentBadge mode="SSR - No Optimization" />
        </body>
        </html>
    );
}
