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

    if (!meal.planed) {
        return (
            <XButton
                className={`absolute cursor-pointer stroke-app-font-2 ${className}`}
                onClick={() => router.push("/")}
                size={33}
            />
        );
    } else if (meal.planed) {
        return (
            <ArrowBack
                className={`absolute cursor-pointer fill-app-font-2 ${className}`}
                onClick={() => router.back()}
            />
        );
    }
}

export default NavigateBackButton;
