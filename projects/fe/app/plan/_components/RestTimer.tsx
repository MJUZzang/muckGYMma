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
import { formatTime } from "@/plan/_utils/time";

const times = [
    {
        title: "0:10",
        value: 10,
    },
    {
        title: "0:20",
        value: 20,
    },
    {
        title: "0:30",
        value: 30,
    },
    {
        title: "0:40",
        value: 40,
    },
    {
        title: "0:50",
        value: 50,
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
    onClose: () => void;
}

function RestTimer({
    children,
    setTime,
    time,
    onClose = () => {},
}: Readonly<RestTimerProps>) {
    const timeIndex =
        localStorage.getItem("timeIndex") !== "" &&
        localStorage.getItem("timeIndex") !== null
            ? parseInt(localStorage.getItem("timeIndex") as string)
            : 0;

    const [selectedTime, setSelectedTime] = useState(timeIndex);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (selectedTime !== -1) {
            setTime(times[selectedTime].value);
        }
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
                onClose();
            }}
        >
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="h-fit bg-[#181818] border-none focus:outline-none">
                <DrawerHeader>
                    <DrawerTitle className="text-white/90 ">
                        <p className="text-xl">휴식 타이머</p>
                        {/* <div className="mt-3 absolute -left-[10vw] w-[110vw] border-b-2 border-b-[#242424]" /> */}
                    </DrawerTitle>
                    {/* <DrawerDescription>
                        This action cannot be undone.
                    </DrawerDescription> */}
                </DrawerHeader>
                x
                <div className="h-fit flex flex-col pb-4">
                    <div className="ml-3 px-1 flex gap-2 text-white/90 text-base md:text-lg overflow-y-auto pb-2">
                        {times.map((time, i) => (
                            <div
                                key={i}
                                className={`rounded-full cursor-pointer backdrop-blur-xl px-3 md:px-5 mt-1 py-1 md:py-3 ${
                                    selectedTime === i
                                        ? "bg-black/80 ring-[1.5px] ring-fluorescent text-fluorescent"
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
                                {formatTime(time)}
                            </div>
                        </div>

                        <div className="flex justify-center gap-10 text-white/90 text-base md:text-2xl mt-4">
                            <div
                                className="bg-slate-800/80 px-6 py-3 rounded-2xl cursor-pointer"
                                onClick={() => {
                                    if (time === 0) {
                                        return;
                                    }

                                    const changedTime = time - 10;
                                    localStorage.setItem(
                                        "restTime",
                                        changedTime.toString()
                                    );

                                    setTime(changedTime);

                                    let changedTimeIndex = -1;
                                    for (let i = 0; i < times.length; i++) {
                                        if (times[i].value === changedTime) {
                                            changedTimeIndex = i;
                                            break;
                                        }
                                    }
                                    localStorage.setItem(
                                        "timeIndex",
                                        `${changedTimeIndex}`
                                    );
                                    setSelectedTime(changedTimeIndex);
                                }}
                            >
                                -10초
                            </div>
                            <div
                                className="bg-slate-800/80 px-6 py-3 rounded-2xl cursor-pointer"
                                onClick={() => {
                                    const changedTime = time + 10;
                                    localStorage.setItem(
                                        "restTime",
                                        changedTime.toString()
                                    );
                                    setTime(changedTime);

                                    let changedTimeIndex = -1;
                                    for (let i = 0; i < times.length; i++) {
                                        if (times[i].value === changedTime) {
                                            changedTimeIndex = i;
                                            break;
                                        }
                                    }
                                    localStorage.setItem(
                                        "timeIndex",
                                        `${changedTimeIndex}`
                                    );
                                    setSelectedTime(changedTimeIndex);
                                }}
                            >
                                +10초
                            </div>
                        </div>
                    </div>

                    <div className="mx-4 mt-5">
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
