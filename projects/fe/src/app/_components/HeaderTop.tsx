import React from "react";

interface HeaderTopProps {
    children?: React.ReactNode;
    className?: string;
}

const HeaderTop: React.FC<HeaderTopProps> = (props) => {
    return (
        <div
            className={`fixed px-3 py-1 w-full flex flex-row items-center border-b-[0.1px] border-b-gray-200 text-2xl
                z-10 bg-white dark:bg-black dark:text-white shadow-lg ${props.className}`}
        >
            {props.children}
        </div>
    );
};

export default HeaderTop;
