import React, { MouseEventHandler, useState } from "react";
import { PredictState } from "@/../lib/slices/predictSlice";
import { backendUrl } from "@/_utils/urls";

interface Props {
    title: string;
    onOkClicked: () => void;
    onCancelClicked: () => void;
    isModalOpen: boolean;
    predict: PredictState;
    selectedPredict: number | null;
}

function ConfirmModal({
    title,
    onOkClicked,
    onCancelClicked,
    isModalOpen,
    predict,
    selectedPredict,
}: Props) {
    const [foodsSelected, setFoodsSelected] = useState<number[]>([]);

    const handleOkClicked: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        onOkClicked();

        if (!predict.predictlist) {
            console.error("predictlist is not exist");
            return;
        }

        fetch(`${backendUrl}/api/food/pick`, {
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
            .then((data) => {
                console.log(data);
            })
            .catch((err) => console.error(err));
    };

    return (
        selectedPredict && (
            <div
                className={`absolute w-full px-[8vw] top-[40vh] transition-all duration-500
                    ${isModalOpen ? "opacity-100 z-[50]" : "opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-black/90 rounded-xl w-full py-6 flex flex-col">
                    <p className="block text-center text-xl text-fluorescent">
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
                                        <p>{food.foodname}</p>
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
                            className="bg-fluorescent px-5 py-2 rounded-lg font-bold"
                            onClick={handleOkClicked}
                        >
                            분석하기
                        </button>
                        <button
                            className="bg-white text-black px-5 py-2 rounded-lg font-extrabold"
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
