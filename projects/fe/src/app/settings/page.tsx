"use client";

import React, { useEffect, useState } from "react";
import ArrowBack from "@/app/_images/ArrowBack";
import ArrowDown from "@/app/_images/ArrowDown";
import ToggleSwitch from "@/app/_components/ToggleSwitch";
import SettingsGroup from "./_components/SettingsGroup";
import SettingElement from "./_components/SettingElement";

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
        <main className="absolute w-screen h-screen overflow-y-auto bg-[#ffffff] dark:bg-[#050505]">
            <header className="fixed w-full text-center py-2">
                <ArrowBack className="absolute dark:fill-white left-2" />
                <p className="text-black dark:text-white">Settings</p>
            </header>
            {/* Spacer */}
            <div className="w-[1px] h-[50px]" />

            <div className="px-3">
                <SettingsGroup title="계정">
                    <SettingElement title="이메일">
                        <p>jeheecheon@gmail.com</p>
                        <ArrowDown className="dark:fill-white" />
                    </SettingElement>

                    <SettingElement title="체중">
                        <p>63kg</p>
                        <ArrowDown className="dark:fill-white" />
                    </SettingElement>

                    <SettingElement title="신장">
                        <p>170cm</p>
                        <ArrowDown className="dark:fill-white" />
                    </SettingElement>
                </SettingsGroup>

                <SettingsGroup title="디스플레이">
                    <SettingElement title="다크 모드">
                        <ToggleSwitch
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
                        />
                    </SettingElement>

                    <SettingElement title="언어">
                        <p>한국어</p>
                        <ArrowDown className="dark:fill-white" />
                    </SettingElement>
                </SettingsGroup>
            </div>
        </main>
    );
};

export default Settings;
