import Logo from "@/_components/Logo";
import React from "react";

function PredictionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}

export default PredictionLayout;
