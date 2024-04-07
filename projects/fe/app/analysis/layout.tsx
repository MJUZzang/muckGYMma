import React from "react";
import LogoAndTitle from "@/_components/LogoAndTitle";

const layout: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    return (
        <>
            {/* Header */}
            <div className="flex items-center p-3">
                <LogoAndTitle />
            </div>

            <div className="px-3 space-y-4">
                <p className="text-white text-3xl font-bold">Analysis</p>
                {props.children}
            </div>
        </>
    );
};

export default layout;
