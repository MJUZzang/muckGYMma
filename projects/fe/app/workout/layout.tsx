import React from "react";
import Link from "next/link";
import LogoAndTitle from "@/_components/LogoAndTitle";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";

import { Dosis, Jua, Noto_Sans, Noto_Serif_JP } from "next/font/google";

const dosis = Dosis({ subsets: ["latin"] });
const jua = Jua({
    subsets: ["latin"],
    weight: ["400"],
});
const notoSans = Noto_Sans({ subsets: ["latin"] });
const notnSerifJP = Noto_Serif_JP({ subsets: ["latin"], weight: "900" });

const links = [
    {
        name: "To do",
        href: "/workout/todo",
    },
    {
        name: "Completed",
        href: "/workout/completed",
    },
];

interface WorkoutLayoutProps {
    children: React.ReactNode;
}

const WorkoutLayout: React.FC<WorkoutLayoutProps> = (props) => {
    return (
        <div className="max-w-[935px] mx-auto w-full">
            {/* <div className="flex items-center">
                <LogoAndTitle />
            </div> */}

            <div className="px-4 w-full">
                <div className="mt-3">
                    <div className="flex justify-between">
                        <div className="w-[68px] h-[68px] lg:w-[98px] lg:h-[98px] overflow-clip rounded-3xl">
                            <Image
                                src={exampleImage}
                                alt="avatar"
                                className="w-full"
                            />
                        </div>

                        <div
                            className="max-w-[68px] max-h-[68px] lg:max-w-[78px] lg:max-h-[78px] bg-white/90 backdrop-blur-lg w-full flex justify-center items-center 
                            rounded-[28px] cursor-pointer group hover:bg-white/60"
                        >
                            <div className="grid grid-cols-2 place-content-center gap-2 group-hover:animate-spin-180">
                                <div className="h-[4px] w-[4px] rounded-full bg-black/60" />
                                <div className="h-[4px] w-[4px] rounded-full bg-black/60" />
                                <div className="h-[4px] w-[4px] rounded-full bg-black/60" />
                                <div className="h-[4px] w-[4px] rounded-full bg-black/60" />
                            </div>
                        </div>
                    </div>
                    <p
                        className={`text-white/90 ${jua.className} font-light mt-2`}
                    >
                        환영합니다,
                    </p>
                    <p
                        className={`text-white/90 font-bold text-xl ${notoSans.className}`}
                    >
                        jeheecheon
                    </p>
                </div>

                <div className="relative bottom-[50px] flex mt-5 lg:mt-[60px]  gap-3 justify-center items-end">
                    <div
                        className="bg-fluorescent px-6 pt-3 pb-5 rounded-3xl rounded-t-[35px] rounded-b-[55px] backdrop-blur-lg w-full max-w-[350px] 
                        relative top-10 hover:animate-pulse"
                    >
                        <div className="mx-auto w-fit">
                            <div className="w-fit">
                                <p
                                    className={`inline-block text-3xl ${dosis.className}`}
                                >
                                    620
                                </p>
                                <p
                                    className={`inline-block text-xl ${jua.className}`}
                                >
                                    kcal
                                </p>
                                <p className={`${jua.className}`}>
                                    금일 섭취 칼로리
                                </p>
                            </div>

                            <div className="w-fit">
                                <p
                                    className={`mt-4 text-xl font-light ${jua.className}`}
                                >
                                    섭취 음식:
                                </p>
                                <p className={`text-sm ${jua.className}`}>
                                    비빔면, 삼겹살
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white px-4 py-5 pb-8 rounded-t-[35px] rounded-b-[55px] backdrop-blur-lg w-full max-w-[350px] hover:animate-pulse">
                        <div className="w-fit mx-auto">
                            <div className="w-fit">
                                <div
                                    className={`bg-fluorescent w-[40px] h-[40px] flex justify-center items-center rounded-full 
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
                                    className={`${jua.className} inline-block text-xl`}
                                >
                                    h
                                </p>
                                <p
                                    className={`${dosis.className} ml-1 inline-block text-2xl font-semibold`}
                                >
                                    15
                                </p>
                                <p
                                    className={`${jua.className} inline-block text-xl`}
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
                                    12
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

                {props.children}
            </div>
        </div>
    );
};

export default WorkoutLayout;
