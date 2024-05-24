"use client";

import { backendUrl } from "@/_utils/urls";
import { userInfoState } from "@/../lib/slices/userInfoSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const dummyUserInfo: userInfoState = {
    nickname: "test",

    physicalSetting: {
        birth: "2000.10.10", // year.month.day 형식
        gender: "남성", // 남성, 여성, 그 외
        weight: 60.5, // kg
        height: 171.2, // cm
    },

    sports: ["테니스", "탁구"],
    /*
    축구 농구 야구 배구 테니스 탁구 볼링 수영 등산 자전거 런닝
    요가 필라테스 크로스핏 핸드볼 댄스 복싱 격투기 킥복싱 수상스키
    스노보드 스키 서핑 스케이트보드 스케이팅
    */

    exercises: ["벤치프레스", "레그컬"],
    /*
    벤치프레스 스쿼트 데드리프트 풀업 푸시업 플랭크 암컬 레그컬 덤벨프레스
    바벨로우 사이드레터럴레이즈 프론트레이즈 레그익스텐션 레그컬 힙레이즈 플랭크
    */

    exerciseSetting: {
        level: "입문자", // 입문자, 초보자, 중급자, 전문가
        goal: "근비대", // 근비대, 유지, 체중 감량
        experience: "처음", // 처음, 3개월 미만, 6개월 미만, 1년 미만, 1년 이상
        frequency: "매일", // 주 1회, 주 2회, 주 3회, 주 4회, 주 5회, 매일
    },
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
