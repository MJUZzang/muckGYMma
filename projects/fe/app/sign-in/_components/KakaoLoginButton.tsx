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
            className="bg-[#FEE500] text-[#191919]"
            title="카카오 로그인"
            Symbol={KakaoSymbol}
        />
    );
};

export default KakaoLoginButton;
