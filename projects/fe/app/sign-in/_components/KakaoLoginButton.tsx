"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LoginButton from "@/sign-in/_components/LoginButton";
import KakaoSymbol from "@/sign-in/_images/KakaoSymbol";
import { kakaoLoginUrl } from "@/sign-in/_utils/login";

interface KakaoLoginButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = (props) => {
    const router = useRouter();

    return (
        <LoginButton
            onClick={() => router.push(kakaoLoginUrl)}
            className="bg-[#FEE500]"
            title="Continue with Kakao"
            Symbol={KakaoSymbol}
        />
    );
};

export default KakaoLoginButton;
