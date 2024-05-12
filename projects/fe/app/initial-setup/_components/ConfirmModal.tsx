import React from "react";

interface ConfirmModalProps {
    isVisible: boolean;
    onClose: () => void;
}

function ConfirmModal({ isVisible, onClose }: ConfirmModalProps) {
    return (
        <div
            className={`absolute left-0 top-[30vh] w-full h-full ${
                !isVisible && "hidden"
            }`}
        >

            {/* 모달 박스 */}
            <div className="flex flex-col justify-center items-center bg-white/15 mx-auto w-[45vw] h-fit bg-stone-900 border-white p-2 rounded-3xl text-center
                px-4 py-6">
                <p className="text-white/90 pb-10 text-base sm:text-xl md:text-2xl">
                    모든 정보를 올바르게 입력해주세요.
                </p>
                <button
                    className="px-4 py-2 bg-fluorescent w-[35vw] text-black/90 rounded-full border-none hover:scale-105 transition duration-300 ease-in-out"
                    onClick={() => onClose()}
                >
                    확인
                </button>
            </div>
        </div>
    );
}

export default ConfirmModal;
