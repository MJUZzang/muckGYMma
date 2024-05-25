"use client";

import ArrowBack from "@/_images/ArrowBack";
import XButton from "@/_images/XButton";
import { MealInfo } from "@/_types/Food";
import { useRouter } from "next/navigation";
import React from "react";

interface NavigateBackButtonProps {
    className?: string;
    meal: MealInfo;
}

function NavigateBackButton({ className, meal }: NavigateBackButtonProps) {
    const router = useRouter();

    return (
        <div
            onClick={() => {
                if (!meal.planed) {
                    router.push("/");
                } else {
                    router.back();
                }
            }}
            className={`w-full justify-start cursor-pointer ${className}`}
        >
            {!meal.planed ? <XButton className="stroke-app-font-2" size={33} /> : <ArrowBack className="fill-app-font-2" />}
        </div>
    );
}

export default NavigateBackButton;
