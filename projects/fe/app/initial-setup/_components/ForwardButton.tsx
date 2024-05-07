"use client";

import Button from "@/_components/Button";
import Link from "next/link";
import React from "react";

interface ForwardButtonProps {
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
}: ForwardButtonProps) {
    return (
        <Link href={href} onClick={onClick} className="mt-auto">
            <Button className={`${className}`}>{title}</Button>
        </Link>
    );
}

export default ForwardButton;
