import React from "react";

interface HeaderBarProps {
    children?: React.ReactNode;
    className?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = (props) => {
    return (
        <div className={`fixed px-3 py-1 h-[40px] w-full flex flex-row items-center border-b-2 text-2xl
        bg-white dark:bg-black z-10
            ${props.className}`}>
            {props.children}
        </div>
    );
};

export default HeaderBar;
