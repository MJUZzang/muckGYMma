"use client";

import React, { useEffect, useState } from "react";
import ArrowBack from "@/app/_components/ArrowBack";
import ArrowDown from "../_components/ArrowDown";

const Settings = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
        } else {
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="absolute w-screen h-screen overflow-y-auto bg-[#ffffff] dark:bg-[#050505]">
            <div className="fixed w-full text-center py-2">
                <ArrowBack className="absolute dark:fill-white left-2" />
                <p className="text-black dark:text-white">Settings</p>
            </div>
            <div className="w-[1px] h-[50px]" />

            <div className="px-3">
                <p className="pt-7 pb-3 text-black dark:text-white">내 정보</p>
                <div className="pl-10 text-black dark:text-white">
                    <div className="py-3 flex flex-row justify-between items-center ">
                        <p>이메일</p>
                        <div className="flex flex-row items-center">
                            <p>jeheecheon@gmail.com</p>
                            <ArrowDown className="dark:fill-white" />
                        </div>
                    </div>
                    <div className="py-3 flex flex-row justify-between items-center ">
                        <p>체중</p>
                        <div className="flex flex-row items-center">
                            <p>63kg</p>
                            <ArrowDown className="dark:fill-white" />
                        </div>
                    </div>
                    <div className="py-3 flex flex-row justify-between items-center ">
                        <p>신장</p>
                        <div className="flex flex-row items-center">
                            <p>170cm</p>
                            <ArrowDown className="dark:fill-white" />
                        </div>
                    </div>
                </div>

                <p className="pt-7 pb-3 text-black dark:text-white">
                    디스플레이
                </p>
                <div className="pl-10 text-black dark:text-white">
                    <div className="py-3 flex flex-row justify-between items-center ">
                        <p>다크 모드</p>
                        <div
                            className="bg-stone-900 w-[50px] h-[29px] rounded-full transition-colors
                            dark:bg-blue-950"
                            onClick={() => {
                                setDarkMode(!darkMode);
                                if (darkMode) {
                                    document.documentElement.classList.remove(
                                        "dark"
                                    );
                                    localStorage.theme = "light";
                                } else {
                                    document.documentElement.classList.add(
                                        "dark"
                                    );
                                    localStorage.theme = "dark";
                                }
                            }}
                        >
                            <div
                                className="h-[24px] w-[24px] bg-white rounded-full relative left-[3px] transition-transform translate-y-[2px]
                                dark:translate-x-[21px]"
                            />
                        </div>
                    </div>
                    <div className="py-3 flex flex-row justify-between items-center ">
                        <p>언어</p>
                        <div className="flex flex-row items-center">
                            <p>한국어</p>
                            <ArrowDown className="dark:fill-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
