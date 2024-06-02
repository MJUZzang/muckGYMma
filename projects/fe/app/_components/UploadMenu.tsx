import React from "react";
import Link from "next/link";
import UploadMeal from "./UploadMeal";

interface UploadMenuProps {
    className?: string;
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function UploadMenu({ className, isVisible, setIsVisible }: UploadMenuProps) {
    return (
        <>
            <div
                className={`bg-app-bg shadow-xl text-app-font-4 font-semibold 
                text-base px-3 py-3 rounded-2xl transition-opacity duration-500
                flex flex-col items-start ${
                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                } ${className}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                }}
            >
                <Link href="/post/write" className="text-nowrap" onClick={() => {
                    setIsVisible(false);
                }}>
                    포스트 작성
                </Link>

                <div className="my-[6px] border-b-[1px] border-b-app-font-6 w-full" />

                <UploadMeal
                    buttonContent="식단 업로드"
                    onClick={() => {
                        setIsVisible(false);
                    }}
                />
            </div>
        </>
    );
}

export default UploadMenu;
