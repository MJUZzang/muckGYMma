import React, { use } from "react";
import Image from "next/image";
import { Noto_Sans_KR, Dosis } from "next/font/google";
import Link from "next/link";
import CheckMark from "@/_images/CheckMark";
import { fetchMeals } from "../_utils/meal";


const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});
const dosis = Dosis({
    subsets: ["latin"],
    weight: "400",
});

async function MealPage() {
    const meals = await fetchMeals();
    return (
        <>
            <p className="flex items-center mx-3 gap-1 px-3 rounded-lg py-2 bg-app-blue bg-opacity-20 backdrop-blur-lg text-black/80 font-semibold text-[14px] mt-3 mb-3">
                <CheckMark className="fill-app-font-4 relative bottom-[2.5px]" />
                먹은 음식 기록
            </p>

            <div className="px-5 space-y-3">
                {meals.map((meal, i) => (
                    <Link
                        key={i}
                        href="/food-info"
                        className="flex gap-3 cursor-pointer"
                    >
                        <div
                            className="w-[85px] h-[85px] sm:w-[105px] sm:h-[105px] 
                        overflow-clip rounded-2xl shrink-0 "
                        >
                            <Image
                                src={meal.imageUrl}
                                alt="Pooh"
                                className="h-full"
                            />
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
                                    {meal.createdAt}
                                </p>
                            </div>
                        </div>

                        <div className="ml-auto my-auto">
                            <button
                                className={`text-nowrap bg-app-blue rounded-full px-4 py-2 
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
        </>
    );
}

export default MealPage;
