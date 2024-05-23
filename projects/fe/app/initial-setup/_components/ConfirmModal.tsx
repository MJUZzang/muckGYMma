import React from "react";

import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

interface ConfirmModalProps {
    isVisible: boolean;
    onClose: () => void;
}

function ConfirmModal({ isVisible, onClose }: ConfirmModalProps) {
    return (
        <div
            className={`absolute left-0 top-[30vh] w-full h-full z-[50] ${
                notoSansKr.className
            } ${!isVisible && "hidden"}`}
        >
            <div
                className="mx-auto md:w-fit bg-app-bg-2
                px-6 md:px-9 pb-4 pt-4 md:pt-6 rounded-3xl space-y-6"
            >
                <p className="text-app-font-2 text-pretty text-center">
                    모든 정보를 올바르게 입력해주세요.
                </p>
                <div className="w-fit mx-auto">
                    <button
                        className="px-4 py-2 bg-app-blue w-[35vw] text-app-inverted-font rounded-full border-none 
                        hover:scale-105 transition duration-300 ease-in-out"
                        onClick={() => onClose()}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
