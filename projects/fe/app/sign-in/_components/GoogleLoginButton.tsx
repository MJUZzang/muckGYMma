"use client";

import React from "react";
import { useRouter } from "next/navigation";

import LoginButton from "@/sign-in/_components/LoginButton";
import GoogleSymbol from "@/sign-in/_images/GoogleSymbol";
import { googleLoginUrl } from "@/sign-in/_utils/login";

interface GoogleLoginButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = (props) => {
    const router = useRouter();

    return (
        <LoginButton
            onClick={() => router.push(googleLoginUrl)}
            className="bg-[#FEFEFE]"
            title="Continue with Google"
            Symbol={GoogleSymbol}
        />
    );
};

export default GoogleLoginButton;
