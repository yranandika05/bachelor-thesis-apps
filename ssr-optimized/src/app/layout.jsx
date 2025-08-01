import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import Navbar from "@/components/Navbar";
import EnvironmentBadge from "@/components/EnvirontmentBadge";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
    title: "SSR Optimized",
    description: "This is the optimized SSR version",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <link
                rel="preload"
                as="font"
                href="https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcviYwY.woff2"
                type="font/woff2"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                as="image"
                href="https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                type="image/jpeg"
            />
            <link
                rel="preload"
                as="image"
                href="/Logo2.png"
                type="image/png"
            />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar/>
        {children}
        <EnvironmentBadge mode="SSR - Optimized"/>
        </body>
        </html>
    );
}
