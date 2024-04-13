import React from "react";

interface Props {
    title: string;
    onOkClicked: () => void;
    onCancelClicked: () => void;
    isModalOpen: boolean;
}

function ConfirmModal({
    title,
    onOkClicked,
    onCancelClicked,
    isModalOpen,
}: Props) {
    return (
        <div
            className={`absolute w-full px-[8vw] top-[40vh] transition-all duration-500
        ${isModalOpen ? "opacity-100 z-[50]" : "opacity-0"}`}
        >
            <div className="bg-black/90 rounded-xl w-full h-[20vh] py-6 flex flex-col">
                <p className="block text-center text-xl text-fluorescent">
                    {title}
                </p>
                <div className="mt-auto flex justify-center gap-5">
                    <button
                        className="bg-fluorescent px-5 py-2 rounded-lg font-bold"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.stopPropagation();
                            onOkClicked();
                        }}
                    >
                        선택하기
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
    );
}

export default ConfirmModal;
