import HeaderTop from "@/app/_components/HeaderTop";
import React from "react";

const layout: React.FC<{
    children: React.ReactNode;
}> = (props) => {
    return (
        <>
            {/* Header */}
            <HeaderTop>
                <p>Analysis</p>
            </HeaderTop>

            {/* Spacer for Header */}
            <div className="w-[1px] h-[50px]" />

            {props.children}
        </>
    );
};

export default layout;
