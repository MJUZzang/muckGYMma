"use client";

import ArrowBack from "@/_images/ArrowBack";
import { useRouter } from "next/navigation";
import React from "react";

function NavigateBack() {
    const router = useRouter();

    return (
        <ArrowBack
            className="fill-app-font-2"
            onClick={() => {
                router.back();
            }}
        />
    );
}

export default NavigateBack;
