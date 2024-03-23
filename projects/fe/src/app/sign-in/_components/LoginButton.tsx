import { StaticImageData } from "next/image";
import React from "react";

interface LoginButtonProps {
    className?: string;
    title?: string;
    Symbol: React.FC;
}

const LoginButton: React.FC<LoginButtonProps> = ({
    className,
    title,
    Symbol,
}) => {
    return (
        <div
            className={`text-sm font-[500] px-4 w-full flex items-center rounded-[4px] py-2
                ${className}`}
        >
            <Symbol />
            <p className="w-full text-center text-black/85">{title}</p>
        </div>
    );
};

export default LoginButton;
