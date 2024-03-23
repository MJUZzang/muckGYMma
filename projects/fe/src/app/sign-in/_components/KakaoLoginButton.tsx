import React from "react";
import LoginButton from "@/app/sign-in/_components/LoginButton";
import KakaoSymbol from "@/app/sign-in/_images/KakaoSymbol";

const KakaoLoginButton = () => {
    return (
        <LoginButton
            className="bg-[#FEE500]"
            title="Continue with Kakao"
            Symbol={KakaoSymbol}
        />
    );
};

export default KakaoLoginButton;
