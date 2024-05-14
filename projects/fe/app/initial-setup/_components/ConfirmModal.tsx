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
            <div className="mx-auto w-[50vw] bg-stone-900 border-white p-2 rounded-3xl">
                <p className="text-app-font-2">
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
