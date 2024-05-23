import { Lilita_One } from "next/font/google";

// import Image from "next/image";
import React from "react";
// import Logo from "@/_images/logo.png";

const lilitaOne = Lilita_One({
    subsets: ["latin"],
    weight: "400",
});

interface LogoProps {
    className?: string;
}

const Logo = ({ className }: LogoProps) => {
    return (
        <>
            {/* <Image src={Logo} alt="Logo" width={78} /> */}
            <div
                className={`flex items-end text-white text-xl ${lilitaOne.className} ${className}`}
            >
                <p className="text-app-font-3 text-2xl">muck</p>
                <p className="text-app-blue text-3xl">GYM</p>
                <p className="text-app-font-3 text-2xl">ma</p>
            </div>
        </>
    );
};

export default Logo;
