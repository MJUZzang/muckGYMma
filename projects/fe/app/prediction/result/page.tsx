"use client";

import React from "react";
import { useAppSelector } from "@/../lib/hooks";
import { PredictResult, selectPredict } from "@/../lib/slices/predictSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

const dummyResultData = {
    id: 6,
    foodLensId: [779],
    foodName: "제육볶음",
    kcal: 186.19,
    carbo: 12.83,
    fat: 9.04,
    gram: 120.7,
    sodium: 466.86,
    protein: 13.8,
};

const dummyImageUrlData =
    "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/2_%25EB%2596%25A1%25EB%25B3%25B6%25EC%259D%25B4.jpg";

function Page() {
    const predict = useAppSelector(selectPredict);
    const router = useRouter();

    const env = process.env.NODE_ENV;

    return (
        <>
            <div className="h-full">
                <p className="block mb-2 text-center text-white/90 mx-auto text-2xl">
                    분석 완료!
                </p>
                <Image
                    src={
                        env === "development"
                            ? dummyImageUrlData
                            : predict.fileUrl
                    }
                    width={300}
                    height={300}
                    alt="food"
                    className="h-[30vh] mx-auto rounded-xl"
                />

                <p className="text-white/90 block mt-10 text-center px-5 text-xl text-balance">
                    영앙소 분석 결과입니다.
                </p>
                <div
                    className="bg-white/15 rounded-lg cursor-pointer px-2 w-[80vw] mx-auto text-white/90 backdrop-blur-lg
                    mt-2 py-1"
                >
                    <p className="block text-center text-xl text-fluorescent my-1">
                        {env === "development"
                            ? dummyResultData.foodName
                            : predict.predictresult?.foodName}
                    </p>
                    <p>
                        칼로리:{" "}
                        {env === "development"
                            ? dummyResultData.kcal
                            : predict.predictresult?.kcal}
                        kcal
                    </p>
                    <p>
                        탄수화물:{" "}
                        {env === "development"
                            ? dummyResultData.carbo
                            : predict.predictresult?.carbo}
                        g
                    </p>
                    <p>
                        단백질:{" "}
                        {env === "development"
                            ? dummyResultData.protein
                            : predict.predictresult?.protein}
                        g
                    </p>
                    <p>
                        지방:{" "}
                        {env === "development"
                            ? dummyResultData.fat
                            : predict.predictresult?.fat}
                        g
                    </p>
                    <p>
                        나트륨:{" "}
                        {env === "development"
                            ? dummyResultData.sodium
                            : predict.predictresult?.sodium}
                        mg
                    </p>
                </div>
            </div>
        </>
    );
}

export default Page;
