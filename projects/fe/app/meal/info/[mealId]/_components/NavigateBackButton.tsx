"use client";

import ArrowBack from "@/_images/ArrowBack";
import { MealInfo } from "@/_types/Meal";
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
                router.back();
            }}
            className={`w-full justify-start cursor-pointer ${className}`}
        >
            <ArrowBack className="fill-app-font-2" />
        </div>
    );
}

export default NavigateBackButton;
