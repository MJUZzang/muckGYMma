import { Lilita_One } from "next/font/google";

import Image from "next/image";
import React from "react";
import Logo from "@/_images/logo.png";

const lilitaOne = Lilita_One({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});
const LogoAndTitle = () => {
    return (
        <>
            <Image src={Logo} alt="Logo" width={78} />
            <div
                className={`flex items-end text-white text-xl ${lilitaOne.className}
                    relative top-1`}
            >
                <p>muck</p>
                <p className="text-fluorescent text-2xl">GYM</p>
                <p>ma</p>
            </div>
        </>
    );
};

export default LogoAndTitle;
