"use client";

import Link from "next/link";
import React from "react";

interface Props {
    title: string;
    href?: string;
    className?: string;
    onClick?: () => void;
}
function ForwardButton({
    href = "",
    onClick = () => {},
    className = "",
    title = "",
}: Props) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`inline-block text-center w-full bg-fluorescent rounded-lg py-2 font-semibold text-black 
            active:scale-90 transition-all 
            ${className}`}
        >
            {title}
        </Link>
    );
}

export default ForwardButton;
