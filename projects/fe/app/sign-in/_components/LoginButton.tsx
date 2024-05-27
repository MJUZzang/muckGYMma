import { Noto_Sans_KR } from "next/font/google";
import React from "react";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

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
            className={`text-[13px] font-[500] px-4 w-full flex items-center rounded-md py-2
                ${className} ${notoSansKr.className}`}
            onClick={onClick}
        >
            <Symbol />
            <p className="w-full text-center">{title}</p>
        </button>
    );
};

export default LoginButton;
