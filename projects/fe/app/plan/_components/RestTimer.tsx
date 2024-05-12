"use client";

import Button from "@/_components/Button";
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/_components/shadcn/ui/drawer";
import React, { useEffect, useState } from "react";

function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

const times = [
    {
        title: "0:30",
        value: 30,
    },
    {
        title: "1:00",
        value: 60,
    },
    {
        title: "1:30",
        value: 90,
    },
    {
        title: "2:00",
        value: 120,
    },
    {
        title: "2:30",
        value: 150,
    },
    {
        title: "3:00",
        value: 180,
    },
];

interface RestTimerProps {
    children: React.ReactNode;
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
}

function RestTimer({ children, setTime, time }: Readonly<RestTimerProps>) {
    const timeIndex =
        localStorage.getItem("timeIndex") !== "" &&
        localStorage.getItem("timeIndex") !== null
            ? parseInt(localStorage.getItem("timeIndex") as string)
            : 0;

    const [selectedTime, setSelectedTime] = useState(timeIndex);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setTime(times[selectedTime].value);
    }, []);

    useEffect(() => {
        if (isRunning) {
            if (time >= 1) {
                setTimeout(() => {
                    setTime(time - 1);
                }, 1000);
            } else {
                setIsRunning(false);
            }
        }
    }, [time, isRunning]);

    return (
        <Drawer
            closeThreshold={0.9}
            onClose={() => {
                setTime(0);
            }}
        >
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="h-[85dvh] bg-[#181818] border-none focus:outline-none">
                <DrawerHeader>
                    <DrawerTitle className="text-white/90 ">
                        <p className="text-xl">휴식 타이머</p>
                        {/* <div className="mt-3 absolute -left-[10vw] w-[110vw] border-b-2 border-b-[#242424] " /> */}
                    </DrawerTitle>
                    {/* <DrawerDescription>
                        This action cannot be undone.
                    </DrawerDescription> */}
                </DrawerHeader>
                x
                <div className="h-full flex flex-col pb-4">
                    <div className="ml-3 flex gap-2 text-white/90 text-base md:text-lg overflow-y-auto pb-2">
                        {times.map((time, i) => (
                            <div
                                key={i}
                                className={`rounded-full  backdrop-blur-xl px-3 md:px-5 py-1 md:py-3 ${
                                    selectedTime === i
                                        ? "bg-black/80 border-[1.5px] border-fluorescent text-fluorescent"
                                        : "bg-slate-800/80"
                                }`}
                                onClick={() => {
                                    setSelectedTime(i);
                                    setTime(time.value);
                                    localStorage.setItem(
                                        "restTime",
                                        time.value.toString()
                                    );
                                    localStorage.setItem(
                                        "timeIndex",
                                        i.toString()
                                    );
                                }}
                            >
                                {time.title}
                            </div>
                        ))}
                    </div>

                    {/* 타이머 */}
                    <div>
                        <div
                            className="mt-8 mx-auto w-fit h-fit rounded-full border-8 box-border border-transparent 
                                flex justify-center items-center"
                            style={{
                                backgroundImage:
                                    "linear-gradient(to top, #dfff32 0%, orange 100%)",
                                backgroundClip: "content-box, border-box",
                            }}
                        >
                            <div
                                className="text-[54px] md:text-[70px] m-2 text-white/90 flex justify-center items-center w-[30dvh] h-[30dvh]
                                    bg-black rounded-full"
                            >
                                {times[selectedTime] && formatSeconds(time)}
                            </div>
                        </div>

                        <div className="flex justify-center gap-10 text-white/90 text-base md:text-2xl mt-4">
                            <div
                                className="bg-slate-800/80 px-6 py-3 rounded-2xl"
                                onClick={() => setTime(time - 10)}
                            >
                                -10초
                            </div>
                            <div
                                className="bg-slate-800/80 px-6 py-3 rounded-2xl"
                                onClick={() => setTime(time + 10)}
                            >
                                +10초
                            </div>
                        </div>
                    </div>

                    <div className="mx-4 mt-auto">
                        <Button
                            className={`text-base md:text-2xl py-3 w-fit ${
                                time === 0
                                    ? "bg-slate-800 text-white/90"
                                    : "bg-fluorescent"
                            }`}
                            onClick={() => {
                                setIsRunning(!isRunning);
                                if (!isRunning && time >= 1) {
                                    const id = setTimeout(() => {
                                        setTime(time - 1);
                                    }, 1000);
                                }
                            }}
                        >
                            {time === 0
                                ? "초기화"
                                : isRunning
                                ? "일시정지"
                                : "재생"}
                        </Button>
                    </div>
                </div>
                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export default RestTimer;
