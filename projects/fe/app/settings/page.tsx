"use client";

import React, { useEffect, useState } from "react";
import ArrowBack from "@/_images/ArrowBack";
import ArrowDown from "@/_images/ArrowDown";
import ToggleSwitch from "@/_components/ToggleSwitch";
import SettingsGroup from "@/settings/_components/SettingsGroup";
import SettingElement from "@/settings/_components/SettingElement";
import { Noto_Sans_KR } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

const Settings = () => {
    const router = useRouter();
    

    useEffect(() => {

    }, []);

    return (
        <main
            className={`bg-app-bg ${notoSansKr.className} animate-page-enter`}
        >
            <header className="fixed w-full text-center py-2">
                <ArrowBack
                    className="absolute fill-app-font-4 left-2 cursor-pointer"
                    onClick={() => {
                        router.back();
                    }}
                />
                <p className="text-app-font-3 font-semibold">설정</p>
            </header>
            {/* Spacer */}
            <div className="w-[1px] h-[50px]" />

            <div className="px-3">
                <SettingsGroup title="계정">
                    <SettingElement title="이메일">
                        <p>jeheecheon@gmail.com</p>
                        {/* <ArrowDown /> */}
                    </SettingElement>

                    <SettingElement title="계정이름">
                        <p>jeheecheon</p>
                        {/* <ArrowDown /> */}
                    </SettingElement>

                    <SettingElement title="성별">
                        <p>남자</p>
                        {/* <ArrowDown /> */}
                    </SettingElement>

                    <SettingElement title="체중">
                        <p>63kg</p>
                        {/* <ArrowDown /> */}
                    </SettingElement>

                    <SettingElement title="신장">
                        <p>170cm</p>
                        {/* <ArrowDown /> */}
                    </SettingElement>
                </SettingsGroup>

                <SettingsGroup title="디스플레이">
                    <SettingElement title="언어">
                        <p>한국어</p>
                        <ArrowDown className="fill-app-font-4" />
                    </SettingElement>
                </SettingsGroup>
            </div>
        </main>
    );
};

export default Settings;
