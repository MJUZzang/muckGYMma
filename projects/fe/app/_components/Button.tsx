import React, { ReactNode } from "react";

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children: ReactNode;
}

function Button({ onClick = () => {}, className = "", children }: ButtonProps) {
    return (
        <button
            className={`inline-block text-center w-full bg-fluorescent rounded-lg py-2 font-semibold text-black 
                active:scale-90 transition-all ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
