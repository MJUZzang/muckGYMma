import React from "react";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

interface ConfirmModalProps {
    isModalOpen: boolean;
    onOkClik: () => void;
    onClose: () => void;
    planIdx: number | null;
}

function ConfirmModal({
    isModalOpen: isVisible,
    onClose,
    onOkClik,
    planIdx,
}: ConfirmModalProps) {
    return (
        <div
            className={`absolute left-0 top-[30vh] w-full h-full z-[50] ${
                notoSansKr.className
            } ${!isVisible && "hidden"}`}
        >
            <div
                className="mx-auto w-fit bg-app-bg-2 shadow-lg
                px-8 md:px-9 pb-4 pt-4 md:pt-6 rounded-3xl space-y-6"
            >
                <p className="text-app-font-2 text-pretty text-center">
                    {planIdx !== null &&
                        `${planIdx + 1}번 플랜을 선택하시겠습니까?`}
                </p>
                <div className="w-fit mx-auto space-x-3">
                    <button
                        className="w-[110px] py-2 bg-app-blue text-app-inverted-font rounded-full border-none 
                        hover:scale-105 transition duration-300 ease-in-out"
                        onClick={() => {
                            onOkClik();
                            onClose();
                        }}
                    >
                        확인
                    </button>
                    <button
                        className="w-[110px] py-2 bg-gray-50 text-app-font-2 rounded-full border-none 
                        hover:scale-105 transition duration-300 ease-in-out"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
