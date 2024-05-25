"use client";

import Camera from "@/_images/Camera";
import { backendUrl } from "@/_utils/urls";
import React, { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/../lib/hooks";
import { PredictState, setPredict } from "@/../lib/slices/predictSlice";

interface FoodPictureProps {
    className?: string;
    size?: number;
}

function FoodPicture({ className, size = 29 }: FoodPictureProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    function handleUpload(e: FormEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            const formData = new FormData();
            formData.append("file", file);

            fetch(`${backendUrl}/api/foods/predict`, {
                method: "POST",
                credentials: "include",
                body: formData,
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("Error occured while uploading image.");
                    }
                })
                .then((data: PredictState) => {
                    if (!data.predictlist) {
                        throw new Error("No prediction data found.");
                    }

                    for (let predict of data.predictlist) {
                        predict.possibility = parseFloat(
                            predict.possibility.toFixed(5)
                        );
                    }
                    dispatch(setPredict(data));
                    router.push(`/meal/prediction/pick`);
                })
                .catch((err) => console.error(err));
        } else {
            console.error("No file selected.");
        }
    }

    function handleClicked() {
        inputRef.current?.click();
    }

    return (
        <>
            <input
                ref={inputRef}
                className="hidden"
                type="file"
                onInput={handleUpload}
            />

            <div onClick={handleClicked} className={`${className}`}>
                <Camera size={size} />
            </div>
        </>
    );
}

export default FoodPicture;
