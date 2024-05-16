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
import ArrowBack from "@/_images/ArrowBack";

import img1 from "@/_images/닭갈비.jpg";
import Image from "next/image";
import { Noto_Sans_KR, Dosis } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

const dosis = Dosis({
    subsets: ["latin"],
});

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
        <>
            <div
                className={`flex flex-col h-[100dvh] animate-page-enter px-3 pt-4 ${notoSansKr.className}`}
            >
                {/* 엑스 버튼 */}
                {/* <div
                className="cursor-pointer ml-3 pt-5"
                onClick={() => {
                    router.back();
                }}
            >
                <div className="space-y-[5px]">
                    <div className="h-[3px] w-[30px] bg-app-font-2 rotate-45 rounded-full" />
                    <div className="relative bottom-[8px] h-[3px] w-[30px] bg-app-font-2 -rotate-45 rounded-full" />
                </div>
            </div> */}

                <div>
                    <ArrowBack
                        className="cursor-pointer fill-app-font-2"
                        onClick={() => {
                            router.back();
                        }}
                    />
                </div>

                <div className="mx-5">
                    <p className="py-3 text-xl font-semibold">닭갈비, 소주, 맥주</p>
                    <Image
                        src={img1}
                        alt="food"
                        className="w-full rounded-2xl"
                    />

                    <div className="flex text-lg items-end mt-3 font-medium">
                        <p>총</p>
                        <p
                            className={`${dosis.className} mx-1 text-2xl font-semibold`}
                        >
                            {predict.predictresult?.kcal}
                        </p>
                        <p>kcal</p>

                        <p className="ml-1 text-xs text-app-font-3">
                            / {predict.predictresult?.gram}g
                        </p>
                    </div>

                    <p className="flex mt-4 text-xs text-app-font-3">
                        나트륨: <p className={`${dosis.className}`}>{predict.predictresult?.sodium}</p>mg
                    </p>

                    {/* 영양성분 표시 */}
                    <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="bg-gray-500 text-app-inverted-font text-sm rounded-lg p-2">
                            탄수화물
                            <p
                                className={`text-base font-semibold ${dosis.className}`}
                            >
                                {predict.predictresult?.carbo}g
                            </p>
                        </div>
                        <div className="bg-gray-700 text-app-inverted-font text-sm rounded-lg p-2">
                            단백질
                            <p
                                className={`text-base font-semibold ${dosis.className}`}
                            >
                                {predict.predictresult?.protein}g
                            </p>
                        </div>
                        <div className="bg-gray-800 text-app-inverted-font text-sm rounded-lg p-2">
                            지방
                            <p
                                className={`text-base font-semibold ${dosis.className}`}
                            >
                                {predict.predictresult?.fat}g
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 w-full px-3 pb-3">
                <button
                    className="text-center w-full bg-app-blue rounded-lg py-2 font-semibold text-app-inverted-font 
                        active:scale-90 transition-all "
                >
                    식사일기 작성하기
                </button>
            </div>
        </>
    );
}

export default FoodInfo;
