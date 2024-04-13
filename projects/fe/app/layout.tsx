import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/_styles/globals.css";
import NavBar from "@/_components/NavBar";
import DarkMode from "@/_components/DarkMode";
import StoreProvider from "./_components/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`flex flex-col h-screen 
                default-bg ${inter.className} dark:text-white `}
            >
                <StoreProvider>
                    {children}
                    <NavBar />
                    <DarkMode />
                </StoreProvider>
            </body>
        </html>
    );
}
