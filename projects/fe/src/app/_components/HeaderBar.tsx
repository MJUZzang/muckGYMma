import React from "react";

interface HeaderBarProps {
    children?: React.ReactNode;
    className?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
    return (
        <div className={`fixed px-2 py-1 h-[40px] w-full flex flex-row items-center border-b-2 text-2xl
            ${props.className}`}>
            {props.children}
        </div>
    );
};

export default HeaderBar;
