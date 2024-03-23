import React from "react";

interface HeaderTopProps {
    children?: React.ReactNode;
    className?: string;
}

const HeaderTop:React.FC<HeaderTopProps> = (props) => {
    return (
        <div
            className={`fixed px-3 py-1 w-full flex flex-row items-center border-b-2 text-2xl
                bg-white dark:bg-black z-10 ${props.className}`}
        >
            {props.children}
        </div>
    );
};

export default HeaderTop;
