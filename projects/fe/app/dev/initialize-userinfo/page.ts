"use client";

import { backendUrl } from "@/_utils/urls";
import { userInfoState } from "@/../lib/slices/userInfoSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const dummyUserInfo: userInfoState = {
    nickname: "JoneDoe",
    exercises: ["스쿼트", "데드리프트", "벤치프레스"],
    exerciseSetting: {
        experience: "3개월 미만",
        frequency: "주 3회",
        goal: "근비대",
        level: "입문자",
    },
    physicalSetting: {
        birth: "1996-01-01",
        gender: "남성",
        height: 180,
        weight: 70,
    },
    sports: ["축구"],
};

function InitializeUserInfoPage() {
    const router = useRouter();

    useEffect(() => {
        fetch(`${backendUrl}/api/member/setup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dummyUserInfo),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to set up");
                } else {
                    console.log("Successfully set up");
                    router.push("/");
                }
            })
            .catch((err) => {
                console.error(err);
                router.push("/");
            });
    }, []);
    return null;
}

export default InitializeUserInfoPage;
