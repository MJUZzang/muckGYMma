import React, { ReactNode, Ref, forwardRef } from "react";

interface ButtonProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    children: ReactNode;
}

const Button = forwardRef(function Butt(
    { onClick = () => {}, className = "", children }: ButtonProps,
    ref: Ref<HTMLDivElement>
) {
    return (
        <div
            ref={ref}
            className={`text-nowrap inline-block text-center w-full bg-app-blue rounded-lg py-2 font-semibold text-app-inverted-font  
                focus:outline-none active:scale-90 transition-all cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
});

export default Button;
