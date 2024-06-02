import React from "react";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";

import { Dosis, Jua, Noto_Sans, Noto_Serif_JP } from "next/font/google";
import {
    FetchNickname as fetchNickname,
    fetchSimpleUserInfo,
} from "@/_utils/user";
import Plans from "@/main/workout/_components/Plans";
import { fetchTodoPlans, sortPlansByDate } from "@/_utils/plan";

const dosis = Dosis({ subsets: ["latin"], weight: ["400", "600"] });
const jua = Jua({
    subsets: ["latin"],
    weight: "400",
});
const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
});
const notnSerifJP = Noto_Serif_JP({
    subsets: ["latin"],
    weight: "900",
});

async function WorkoutPage() {
    const { nickname, profileImageUrl } = await fetchSimpleUserInfo();
    const plans = await fetchTodoPlans();
    const sortedPlans = sortPlansByDate(plans);
    console.log(profileImageUrl);
    return (
        <div className="max-w-[835px] mx-auto w-full">
            <div className="px-4 w-full">
                <div className="mt-3">
                    <div className="flex justify-between">
                        <div className="w-[68px] h-[68px] lg:w-[98px] lg:h-[98px]">
                            <div className="w-[68px] h-[68px] lg:w-[98px] lg:h-[98px] overflow-clip rounded-3xl">
                                <Image
                                    src={profileImageUrl}
                                    alt="User avatar"
                                    className="w-[68px] h-[68px] lg:w-[98px] lg:h-[98px] pointer-events-none"
                                    width={43}
                                    height={43}
                                />
                            </div>
                        </div>

                        <div
                            className="max-w-[68px] max-h-[68px] lg:max-w-[78px] lg:max-h-[78px] bg-app-bg-2 backdrop-blur-lg w-full flex justify-center items-center 
                            rounded-[28px] cursor-pointer group hover:bg-app-bg-3"
                        >
                            <div className="grid grid-cols-2 place-content-center gap-2 group-hover:animate-spin-180">
                                <div className="h-[4px] w-[4px] rounded-full bg-app-font-2" />
                                <div className="h-[4px] w-[4px] rounded-full bg-app-font-2" />
                                <div className="h-[4px] w-[4px] rounded-full bg-app-font-2" />
                                <div className="h-[4px] w-[4px] rounded-full bg-app-font-2" />
                            </div>
                        </div>
                    </div>
                    <p
                        className={`text-app-font-2 ${jua.className} font-light mt-2`}
                    >
                        환영합니다,
                    </p>
                    <p
                        className={`text-app-font-2 font-bold text-xl ${notoSans.className}`}
                    >
                        {nickname}
                    </p>
                </div>

                <div className="relative bottom-[60px] flex mt-5 lg:mt-[60px] gap-3 justify-center items-end">
                    <div
                        className="bg-app-blue px-6 pt-3 pb-8 rounded-3xl rounded-t-[35px] rounded-b-[75px] backdrop-blur-lg w-full max-w-[350px] 
                        relative top-10 hover:animate-pulse text-white/95"
                    >
                        <div className="mx-auto w-fit">
                            <div className="w-fit">
                                <p
                                    className={`inline-block text-3xl ${dosis.className}`}
                                >
                                    620
                                </p>
                                <p
                                    className={`inline-block text-xl ${notoSans.className}`}
                                >
                                    kcal
                                </p>
                                <p className={`${jua.className}`}>
                                    금일 섭취 칼로리
                                </p>
                            </div>

                            <div className="w-fit">
                                <p
                                    className={`text-sm mt-4 font-light ${jua.className}`}
                                >
                                    금일 섭취 :
                                </p>
                                <p className={`text-sm ${jua.className}`}>
                                    &quot;비빔면, 삼겹살&quot;
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-app-bg-4 px-4 py-5 pb-8 rounded-t-[35px] rounded-b-[55px] backdrop-blur-lg w-full max-w-[350px] hover:animate-pulse
                        text-app-font-2"
                    >
                        <div className="w-fit mx-auto">
                            <div className="w-fit">
                                <div
                                    className={`bg-app-blue w-[40px] h-[40px] flex justify-center items-center rounded-full 
                                    ${notnSerifJP.className} font-extrabold text-lg`}
                                >
                                    !
                                </div>

                                <p
                                    className={`${dosis.className} inline-block text-2xl font-semibold`}
                                >
                                    2
                                </p>
                                <p
                                    className={`${notoSans.className} inline-block font-semibold text-xl`}
                                >
                                    h
                                </p>
                                <p
                                    className={`${dosis.className} ml-1 inline-block text-2xl font-semibold`}
                                >
                                    15
                                </p>
                                <p
                                    className={`${notoSans.className} inline-block font-semibold text-xl`}
                                >
                                    m
                                </p>
                                <p className={`${jua.className}`}>
                                    예상 소요시간
                                </p>
                            </div>

                            <div className="w-fit">
                                <p
                                    className={`inline-block mt-4 text-2xl font-semibold ${dosis.className}`}
                                >
                                    {sortedPlans.length}
                                </p>
                                <p
                                    className={`inline-block text-xl ml-1 ${jua.className}`}
                                >
                                    개
                                </p>
                                <p className={`${jua.className}`}>
                                    누적 운동플랜
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Plans plans={sortedPlans} />
            </div>
        </div>
    );
}

export default WorkoutPage;
