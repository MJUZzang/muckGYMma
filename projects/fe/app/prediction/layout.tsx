import LogoAndTitle from "@/_components/LogoAndTitle";
import React from "react";

function PredictionLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex items-center">
                <LogoAndTitle />
            </div>
            {children}
        </>
    );
}

export default PredictionLayout;
