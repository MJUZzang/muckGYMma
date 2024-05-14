"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
    PredictResult,
    PredictState,
    selectPredict,
    setFileUrl,
    setPredictResult,
} from "@/../lib/slices/predictSlice";
import { useAppDispatch, useAppSelector } from "@/../lib/hooks";

const dummyPredictResult: PredictState = {
    fileUrl:
        "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/2_%25EB%2596%25A1%25EB%25B3%25B6%25EC%259D%25B4.jpg",
    predictresult: {
        id: 6,
        foodLensId: [779],
        foodName: "제육볶음",
        kcal: 186.19,
        carbo: 12.83,
        fat: 9.04,
        gram: 120.7,
        sodium: 466.86,
        protein: 13.8,
    },
};

function FoodInfo() {
    const router = useRouter();
    const predict = useAppSelector(selectPredict);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            dispatch(setFileUrl(dummyPredictResult.fileUrl));
            dispatch(
                setPredictResult(
                    dummyPredictResult.predictresult as PredictResult
                )
            );
        }
    });
    return (
        <div className="flex flex-col h-[100dvh] animate-page-enter">
            {/* 엑스 버튼 */}
            <div
                className="cursor-pointer ml-3 pt-5"
                onClick={() => {
                    router.back();
                }}
            >
                <div className="space-y-[5px]">
                    <div className="h-[3px] w-[30px] bg-white rotate-45 rounded-full" />
                    <div className="relative bottom-[8px] h-[3px] w-[30px] bg-white -rotate-45 rounded-full" />
                </div>
            </div>

            <div className="flex flex-col mx-3 mt-4">
                <div className="flex items-center gap-3">
                    {/* 운동 아이콘 */}
                    <div className="w-[80px] h-[80px] bg-white rounded-full" />
                    <div>
                        <p className="text-app-font-2">제육볶음</p>
                        <p className="text-app-font-2">720kcal</p>
                        <p className="text-app-font-2">업로드: 2022-01-01</p>
                    </div>
                </div>
            </div>

            <div
                className="bg-white/15 rounded-lg cursor-pointer px-2 w-[80vw] mx-auto text-app-font-2 backdrop-blur-lg
                    py-1 mt-4"
            >
                <p className="block text-center text-xl text-app-blue my-1">
                    영양성분
                </p>
                <p>
                    칼로리: {predict.predictresult?.kcal}
                    kcal
                </p>
                <p>탄수화물: {predict.predictresult?.carbo}g</p>
                <p>단백질: {predict.predictresult?.protein}g</p>
                <p>지방: {predict.predictresult?.fat}g</p>
                <p>
                    나트륨: {predict.predictresult?.sodium}
                    mg
                </p>
            </div>

            <div className="inline-block mt-auto mx-3 mb-3">
                <button
                    className="text-center w-full bg-app-blue rounded-lg py-2 font-semibold text-black 
                active:scale-90 transition-all "
                >
                    포스트 작성
                </button>
            </div>
        </div>
    );
}

export default FoodInfo;
