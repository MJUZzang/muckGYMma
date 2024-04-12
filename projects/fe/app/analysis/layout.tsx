import React from "react";
import LogoAndTitle from "@/_components/LogoAndTitle";

const layout: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    return (
        <div className="">
            {/* Header */}
            <div className="flex items-center">
                <LogoAndTitle />
            </div>

            <div className="px-3 space-y-4 h-full">
                <p className="text-white text-3xl font-bold">Analysis</p>
                {props.children}
            </div>
        </div>
    );
};

export default layout;
