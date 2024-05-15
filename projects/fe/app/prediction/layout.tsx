import Logo from "@/_components/Logo";
import React from "react";

function PredictionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex items-center">
                <Logo />
            </div>
            {children}
        </>
    );
}

export default PredictionLayout;
