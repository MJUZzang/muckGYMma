import React from "react";

import exampleImage from "@/_images/닭갈비.jpg";
import Image from "next/image";

import { Jua } from "next/font/google";

import NavigateNext from "@/_images/NavigateNext";

const jua = Jua({
    subsets: ["latin"],
    weight: ["400"],
});

function Page() {
    return (
        <div className="">
            {Array(10)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="px-1 flex gap-2 hover:bg-white/10 transition duration-200">
                        <div className="w-[75px] h-[75px] overflow-clip rounded-3xl shrink-0">
                            <Image src={exampleImage} alt="Pooh" className="h-full" />
                        </div>

                        <div className={`${jua.className} py-1 w-full`}>
                            <p className="text-white/90 text-xl">
                                삼겹살, 비빔면
                            </p>
                            <p className="text-white/90 text-sm">320kcal</p>
                            <p className="text-white/90 text-xs">2024-01-01</p>
                        </div>

                        <div className="flex items-center justify-center">
                            <p className={`text-black/85 bg-fluorescent border-[1px] text-xs border-black/20 px-2 py-1 rounded-3xl font-mono font-semibold`}>posted</p>
                            <NavigateNext
                                hight={34}
                                width={34}
                                className="fill-white/90"
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Page;
