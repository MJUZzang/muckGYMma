import React from "react";

interface LoginButtonProps {
    className?: string;
    title?: string;
    Symbol: React.FC;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const LoginButton: React.FC<LoginButtonProps> = ({
    className,
    title,
    Symbol,
    onClick,
}) => {
    return (
        <button
            className={`text-sm font-[500] px-4 w-full flex items-center rounded-[4px] py-2
                ${className}`}
            onClick={onClick}
        >
            <Symbol />
            <p className="w-full text-center text-black/85">{title}</p>
        </button>
    );
};

export default LoginButton;
