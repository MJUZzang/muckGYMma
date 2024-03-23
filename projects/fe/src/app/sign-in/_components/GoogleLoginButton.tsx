import React from "react";
import LoginButton from "@/app/sign-in/_components/LoginButton";
import GoogleSymbol from "@/app/sign-in/_images/GoogleSymbol";

const GoogleLoginButton = () => {
    return (
        <LoginButton
            className="bg-[#FEFEFE]"
            title="Continue with Google"
            Symbol={GoogleSymbol}
        />
    );
};

export default GoogleLoginButton;
