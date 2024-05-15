import React from "react";

import img1 from "@/_images/닭갈비.jpg";
import img2 from "@/_images/삼겹살.jpg";
import img3 from "@/_images/떡볶이.jpg";
import img4 from "@/_images/버거.jpg";

import Image from "next/image";

import { Jua, Noto_Sans_KR, Dosis } from "next/font/google";

import NavigateNext from "@/_images/NavigateNext";
import Link from "next/link";

const dummyData = [
    {
        image: img1,
        name: "삼겹살",
        date: "2024-01-01: 12:00",
        kcal: 320,
        posted: false,
    },
    {
        image: img2,
        name: "비빔면",
        date: "2024-01-01: 12:00",
        kcal: 320,
        posted: false,
    },
    {
        image: img3,
        name: "떡볶이",
        date: "2024-01-01: 12:00",
        kcal: 320,
        posted: true,
    },
    {
        image: img4,
        name: "버거",
        date: "2024-01-01: 12:00",
        kcal: 320,
        posted: true,
    },
];

const jua = Jua({
    subsets: ["latin"],
    weight: ["400"],
});
const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});
const dosis = Dosis({
    subsets: ["latin"],
});

function Page() {
    return (
        <div className="space-y-3 pt-2">
            {dummyData.map((meal, i) => (
                <Link
                    key={i}
                    href="/food-info"
                    className="flex gap-3 cursor-pointer"
                >
                    <div
                        className="w-[85px] h-[85px] sm:w-[105px] sm:h-[105px] 
                        overflow-clip rounded-2xl shrink-0 "
                    >
                        <Image src={meal.image} alt="Pooh" className="h-full" />
                    </div>

                    <div
                        className={`py-[6px] w-full flex flex-col justify-start`}
                    >
                        <p
                            className={`text-app-font-2 text-lg ${notoSansKr.className}`}
                        >
                            {meal.name}
                        </p>

                        <div className="mt-auto">
                            <div className="text-app-font-2 text-base">
                                <p
                                    className={`inline-block ${dosis.className}`}
                                >
                                    {`${meal.kcal} `}
                                </p>
                                <p
                                    className={`inline-block ${notoSansKr.className}`}
                                >
                                    kcal
                                </p>
                            </div>

                            <p
                                className={`text-app-font-2 text-xs ${dosis.className}`}
                            >
                                {meal.date}
                            </p>
                        </div>
                    </div>

                    <div className="ml-auto my-auto">
                        <button
                            className={`text-nowrap mr-3 bg-app-blue rounded-full px-4 py-2 
                                text-sm text-app-inverted-font
                                ${notoSansKr.className}`}
                        >
                            상세 정보
                        </button>
                    </div>

                    {/* <div className="flex items-center justify-center">
                            <p
                                className={`text-black/85 bg-app-blue border-[1px] text-xs border-black/20 px-2 py-1 rounded-3xl font-mono font-semibold`}
                            >
                                posted
                            </p>
                            <NavigateNext
                                hight={34}
                                width={34}
                                className="fill-white/90"
                            />
                        </div> */}
                </Link>
            ))}
        </div>
    );
}

export default Page;
