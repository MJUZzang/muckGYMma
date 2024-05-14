import Muscle from "@/_images/Muscle";
import Swimming from "@/_images/Swimming";
import Football from "@/_images/Football";

import Link from "next/link";
import React, { useState } from "react";
import { Dosis, Jua, Noto_Sans_KR } from "next/font/google";
import { formatTimeInKor } from "@/plan/_utils/time";

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

const dummyData = [
    {
        name: "헬스",
        Image: <Muscle />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "수영",
        Image: <Swimming />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "축구",
        Image: <Football />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "헬스",
        Image: <Muscle />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "수영",
        Image: <Swimming />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "축구",
        Image: <Football />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "헬스",
        Image: <Muscle />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "수영",
        Image: <Swimming />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "축구",
        Image: <Football />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "헬스",
        Image: <Muscle />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "수영",
        Image: <Swimming />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "축구",
        Image: <Football />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
    {
        name: "헬스",
        Image: <Muscle />,
        duration: 1800,
        kcal: 320,
        date: "2022-01-01: 12:00",
    },
];

function Page() {
    return (
        <div className="space-y-2">
            {dummyData.map((task, i) => (
                <Link
                    key={i}
                    href="/plan-info"
                    className="pl-2 pr-5 py-2 mx-2 rounded-3xl flex items-center gap-3
                        bg-app-bg-1 hover:bg-app-bg-3 hover:shadow-sm transition duration-500 ease-in-out"
                >
                    <div className="">{task.Image}</div>
                    <div>
                        <p
                            className={`text-app-font-2 font-semibold ${notoSansKr.className}`}
                        >
                            {task.name} 
                        </p>

                        <p className={`mt-2 text-xs ${notoSansKr.className}`}>{formatTimeInKor(task.duration)} 소요</p>
                        <p
                            className={`text-xs text-app-font-2 ${notoSansKr.className}`}
                        >
                            완료일: {task.date}
                        </p>
                    </div>
                    <div className="ml-auto flex flex-col items-center relative top-1">
                        <p className={`text-app-font-2 ${dosis.className}`}>
                            {task.kcal}
                        </p>
                        <p
                            className={`relative bottom-2 text-app-font-4 ${jua.className}`}
                        >
                            kcal
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Page;
