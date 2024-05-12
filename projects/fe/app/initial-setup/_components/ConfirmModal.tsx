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
            <div className="flex flex-col justify-center items-center bg-white/15 mx-auto w-[45vw] h-[30vw] bg-stone-900 border-white p-2 rounded-3xl text-center">
                <p className="text-white/90 mb-10 text-xl">
                    모든 정보를 올바르게 입력해주세요.
                </p>
                <button
                    className="px-4 py-2 bg-fluorescent w-[35vw] text-black/90 rounded-full border-none "
                    onClick={() => onClose()}
                >
                    확인
                </button>
            </div>
        </div>
    );
}

export default ConfirmModal;
