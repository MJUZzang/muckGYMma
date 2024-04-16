"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/../lib/hooks";
import { PredictState, selectPredict } from "@/../lib/slices/predictSlice";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import ConfirmModal from "@/prediction/pick-one/_components/ConfirmModal";

// const dummyData = {
//     predictlist: [
//         {
//             keyname: "roasted_pork_belly",
//             foodlist: [
//                 {
//                     id: 690,
//                     foodname: "돼지삼겹살(구운것)",
//                     manufacturer: "",
//                     predict_key: "roasted_pork_belly",
//                 },
//             ],
//             possibility: 99.98961687088013,
//         },
//         {
//             keyname: "smoked_pork_belly",
//             foodlist: [
//                 {
//                     id: 11116,
//                     foodname: "훈제삼겹살",
//                     manufacturer: "",
//                     predict_key: "smoked_pork_belly",
//                 },
//             ],
//             possibility: 0.005348741251509637,
//         },
//         {
//             keyname: "bossam",
//             foodlist: [
//                 {
//                     id: 820,
//                     foodname: "돼지고기보쌈(사태)",
//                     manufacturer: "",
//                     predict_key: "bossam",
//                 },
//                 {
//                     id: 821,
//                     foodname: "돼지고기보쌈(삼겹살)",
//                     manufacturer: "",
//                     predict_key: "bossam",
//                 },
//             ],
//             possibility: 0.0026325657017878257,
//         },
//         {
//             keyname: "steak_rice",
//             foodlist: [
//                 {
//                     id: 80,
//                     foodname: "스테이크덮밥",
//                     manufacturer: "",
//                     predict_key: "steak_rice",
//                 },
//             ],
//             possibility: 0.0006327998562483117,
//         },
//         {
//             keyname: "five_spice_sliced_pork",
//             foodlist: [
//                 {
//                     id: 894,
//                     foodname: "오향장육",
//                     manufacturer: "",
//                     predict_key: "five_spice_sliced_pork",
//                 },
//             ],
//             possibility: 0.00041311200220661703,
//         },
//     ],
//     fileUrl:
//         "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/1_%25EC%2582%25BC%25EA%25B2%25B9%25EC%2582%25B4.jpg",
// };

// if (dummyData.predictlist) {
//     for (let predict of dummyData.predictlist) {
//         predict.possibility = parseFloat(predict.possibility.toFixed(5));
//     }
// }

export default function Page() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedPredict, setSelectedPredict] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const predict: PredictState = useAppSelector(selectPredict);
    // const predict = dummyData;

    return (
        <div className="h-full" onClick={() => setIsModalOpen(false)}>
            <ConfirmModal
                title="섭취한 음식을 선택해주세요"
                onOkClicked={() => setIsModalOpen(false)}
                onCancelClicked={() => setIsModalOpen(false)}
                isModalOpen={isModalOpen}
                predict={predict}
                selectedPredict={selectedPredict}
            />

            <p className="block mb-2 text-center text-white/90 mx-auto text-2xl">
                분석 완료!
            </p>
            <Image
                src={predict.fileUrl}
                width={300}
                height={300}
                alt="food"
                className="h-[30vh] mx-auto rounded-xl"
            />

            <p className="text-white/90 block mt-10 text-center px-5 text-xl text-balance">
                아래에서 정확한 분석 결과 하나를 골라주세요.
            </p>
            <div ref={emblaRef} className="overflow-hidden flex flex-col mt-5">
                <div className="flex text-white/90">
                    {predict.predictlist?.map((item, idx) => (
                        <div
                            key={item.keyname}
                            className="bg-white/15  shrink-0 grow-0 rounded-lg cursor-pointer
                            px-2 first:ml-[10vw] last:mr-[10vw] ml-[5vw] w-[80vw]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPredict(idx);
                                setIsModalOpen(true);
                            }}
                        >
                            <p className="block backdrop-blur-lg text-center text-xl text-fluorescent">
                                {idx + 1}번
                            </p>
                            <p>정확도: {item.possibility}%</p>
                            <div>
                                {item.foodlist.map((food) => (
                                    <div key={food.id}>
                                        <p>{food.foodname}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
