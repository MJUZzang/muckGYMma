import ArrowBack from "@/_images/ArrowBack";
import NavigateBackButton from "@/meal/info/[mealId]/_components/NavigateBackButton";
import React from "react";

interface PickLayoutProps {
    children?: React.ReactNode;
}

function PickLayout({ children }: PickLayoutProps) {
    return (
        <div className="pt-4">
            <div className="grid grid-cols-3">
                <ArrowBack className="fill-app-font-2" />

                <p className="text-lg w-full text-center font-semibold">
                    운동계획 선택
                </p>
            </div>

            {children}
        </div>
    );
}

export default PickLayout;
