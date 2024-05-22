"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/../lib/hooks";
import {
    PredictResult,
    PredictState,
    selectPredict,
    setPredict,
    setPredictResult,
} from "@/../lib/slices/predictSlice";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import ConfirmModal from "@/prediction/pick-one/_components/ConfirmModal";
import ArrowBack from "@/_images/ArrowBack";
import Button from "@/_components/Button";
import { backendUrl } from "@/_utils/urls";
import { useRouter } from "next/navigation";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

const dummyData = {
    predictlist: [
        {
            keyname: "roasted_pork_belly",
            foodlist: [
                {
                    id: 690,
                    foodname: "돼지삼겹살(구운것)",
                    manufacturer: "",
                    predict_key: "roasted_pork_belly",
                },
            ],
            possibility: 99.98961,
        },
        {
            keyname: "smoked_pork_belly",
            foodlist: [
                {
                    id: 11116,
                    foodname: "훈제삼겹살",
                    manufacturer: "",
                    predict_key: "smoked_pork_belly",
                },
            ],
            possibility: 0.00534,
        },
        {
            keyname: "bossam",
            foodlist: [
                {
                    id: 820,
                    foodname: "돼지고기보쌈(사태)",
                    manufacturer: "",
                    predict_key: "bossam",
                },
                {
                    id: 821,
                    foodname: "돼지고기보쌈(삼겹살)",
                    manufacturer: "",
                    predict_key: "bossam",
                },
            ],
            possibility: 0.00263,
        },
        {
            keyname: "steak_rice",
            foodlist: [
                {
                    id: 80,
                    foodname: "스테이크덮밥",
                    manufacturer: "",
                    predict_key: "steak_rice",
                },
            ],
            possibility: 0.00063,
        },
        {
            keyname: "five_spice_sliced_pork",
            foodlist: [
                {
                    id: 894,
                    foodname: "오향장육",
                    manufacturer: "",
                    predict_key: "five_spice_sliced_pork",
                },
            ],
            possibility: 0.00041,
        },
    ],
    fileUrl:
        "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/1_%25EC%2582%25BC%25EA%25B2%25B9%25EC%2582%25B4.jpg",
};

// if (dummyData.predictlist) {
//     for (let predict of dummyData.predictlist) {
//         predict.possibility = parseFloat(predict.possibility.toFixed(5));
//     }
// }

export default function Page() {
    const dispatch = useAppDispatch();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedPredict, setSelectedPredict] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const predict: PredictState = useAppSelector(selectPredict);
    const [isFoodSelected, setIsFoodSelected] = useState<boolean>(false);
    const [foodsSelected, setFoodsSelected] = useState<number[]>([]);

    const router = useRouter();

    // useEffect(() => {
    //     if (process.env.NODE_ENV === "development") {
    //         dispatch(setPredict(dummyData));
    //     }
    // });

    function handleOkClicked() {
        if (!predict.predictlist) {
            console.error("predictlist does not exist");
            return;
        }

        fetch(`${backendUrl}/api/foods/pick`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: foodsSelected,
                imageUrl: predict.fileUrl,
            }),
        })
            .then((res) => {
                console.log(res.status);
                if (res.ok) {
                    return res.json();
                } else {
                    console.error("fail");
                }
            })
            .then((data: PredictResult) => {
                console.log(data);
                dispatch(setPredictResult(data));
                router.push("/prediction/plan-selection");
            })
            .catch((err) => console.error(err));
    }

    return (
        <>
            <div
                className={`h-full animate-page-enter ${notoSansKr.className}`}
                onClick={() => setIsModalOpen(false)}
            >
                <ArrowBack className="fill-app-font-4 cursor-pointer ml-3 mt-4 mb-3" />

                <div className="mx-5">
                    <Image
                        src={predict.fileUrl}
                        alt="food"
                        width={375}
                        height={375}
                        className="w-full mx-auto rounded-3xl"
                    />
                </div>

                <p className="mt-3 text-app-font-3 mx-auto text-xl px-5 text-center font-semibold">
                    AI 음식 분석 완료!
                </p>
                <p className="text-app-font-2 mt-3 text-center px-5 text-balance text-base">
                    아래에서 정확한 분석 결과 하나를 선택하세요.
                </p>
                <div
                    ref={emblaRef}
                    className="overflow-hidden flex flex-col mt-5"
                >
                    <div className="flex text-app-font-2">
                        {predict.predictlist?.map((item, idx) => (
                            <div
                                key={item.keyname}
                                className="bg-app-bg-1 shrink-0 grow-0 rounded-lg cursor-pointer
                                    px-2 py-3 first:ml-[10vw] last:mr-[10vw] ml-[5vw] w-[65vw]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPredict(idx);
                                    setIsModalOpen(true);
                                }}
                            >
                                <div className="w-[55vw] mx-auto">
                                    <p className="backdrop-blur-lg text-left text-xl text-app-blue">
                                        {idx + 1}번
                                    </p>
                                    <p className="text-sm text-app-font-4 text-left">
                                        정확도: {item.possibility}%
                                    </p>
                                    <div className="mt-2 text-sm">
                                        {item.foodlist.map((food) => (
                                            <p key={food.id}>{food.foodname}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 px-4 pb-4 w-full">
                <Button
                    className={`${
                        !isFoodSelected &&
                        "bg-app-blue/65 text-app-inverted-font hover:bg-app-blue/90"
                    }`}
                    onClick={handleOkClicked}
                >
                    영양성분 분석하기
                </Button>
            </div>

            <ConfirmModal
                title="섭취하신 음식을 알려주세요"
                onOkClicked={() => {
                    setIsModalOpen(false);
                    setIsFoodSelected(true);
                }}
                foodsSelected={foodsSelected}
                setFoodsSelected={setFoodsSelected}
                onCancelClicked={() => setIsModalOpen(false)}
                isModalOpen={isModalOpen}
                predict={predict}
                selectedPredict={selectedPredict}
            />
        </>
    );
}
