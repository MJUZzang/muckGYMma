"use client";

import React from "react";
import { useAppSelector } from "@/../lib/hooks";
import { selectPredict } from "@/../lib/slices/predictSlice";

export default function Page() {
    const predict = useAppSelector(selectPredict);

    return (
        <>
            <p>File path: ${predict.fileUrl}</p>

            <div className="flex flex-col">
                {predict.predictlist?.map((item) => (
                    <div key={item.keyname}>
                        <p>{item.keyname}</p>
                        <p>{item.possibility}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
