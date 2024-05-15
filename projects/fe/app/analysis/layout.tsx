import React from "react";
import Logo from "@/_components/Logo";

const layout: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    return (
        <div className="max-w-[835px] mx-auto w-full">
            {/* Header */}
            <div className="flex items-center">
                <Logo />
            </div>

            <div className="px-3 space-y-4 h-full">
                <p className="text-white text-3xl font-bold">Analysis</p>
                {props.children}
            </div>
        </div>
    );
};

export default layout;
