import React, { MouseEventHandler, useEffect, useState } from "react";
import {
    PredictResult,
    PredictState,
    setPredictResult,
} from "@/../lib/slices/predictSlice";
import { backendUrl } from "@/_utils/urls";
import { useAppDispatch } from "@/../lib/hooks";
import { useRouter } from "next/navigation";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

interface ConfirmModalProps {
    title: string;
    onOkClicked: () => void;
    onCancelClicked: () => void;
    isModalOpen: boolean;
    predict: PredictState;
    selectedPredict: number | null;
    setFoodsSelected: React.Dispatch<React.SetStateAction<number[]>>;
    foodsSelected: number[];
}

function ConfirmModal({
    title,
    onOkClicked,
    onCancelClicked,
    isModalOpen,
    predict,
    selectedPredict,
    setFoodsSelected,
    foodsSelected,
}: ConfirmModalProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        setFoodsSelected([]);
    }, [isModalOpen]);

    const handleOkClicked: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        onOkClicked();
    };

    return (
        selectedPredict !== null &&
        selectedPredict !== undefined && (
            <div
                className={`absolute w-full px-[8vw] top-[30vh] transition-all duration-500
                    ${isModalOpen ? "opacity-100 z-[50]" : "opacity-0"} ${
                    notoSansKr.className
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-app-bg-1 rounded-xl w-full py-6 flex flex-col shadow-xl border-2">
                    <p className="text-center text-xl text-app-font-3 font-semibold">
                        {title}
                    </p>

                    <div className="text-white my-5 flex flex-col gap-3">
                        {predict.predictlist &&
                            predict.predictlist[selectedPredict].foodlist.map(
                                (food, idx) => (
                                    <div
                                        key={food.id}
                                        className="flex justify-between px-5"
                                    >
                                        <p className="text-app-font-3 text-[0.925rem]">
                                            {food.foodname}
                                        </p>
                                        <input
                                            type="checkbox"
                                            checked={foodsSelected.includes(
                                                food.id
                                            )}
                                            onChange={() => {
                                                if (
                                                    foodsSelected.includes(
                                                        food.id
                                                    )
                                                ) {
                                                    setFoodsSelected(
                                                        foodsSelected.filter(
                                                            (id) =>
                                                                id !== food.id
                                                        )
                                                    );
                                                } else {
                                                    setFoodsSelected([
                                                        ...foodsSelected,
                                                        food.id,
                                                    ]);
                                                }
                                            }}
                                        />
                                    </div>
                                )
                            )}
                    </div>

                    <div className="mt-auto flex justify-center gap-5">
                        <button
                            className="bg-app-blue px-5 py-2 rounded-lg font-bold text-white shadow-lg"
                            onClick={handleOkClicked}
                        >
                            음식 선택
                        </button>
                        <button
                            className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
                            onClick={() => onCancelClicked()}
                        >
                            아니요
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default React.memo(ConfirmModal);
