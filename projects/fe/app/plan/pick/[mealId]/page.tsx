"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/../lib/hooks";
import { selectPredictResult } from "@/../lib/slices/predictSlice";
import { backendUrl } from "@/_utils/urls";
import { useParams } from "next/navigation";

function PickPage() {
    const predictResult = useAppSelector(selectPredictResult);
    const [plansPromise, setPlansPromise] = useState<Promise<void> | null>(
        null
    );
    const params = useParams();

    if (plansPromise) use(plansPromise!);

    useEffect(() => {
        if (!plansPromise) {
            setPlansPromise(
                fetch(`${backendUrl}/api/task/ask/${params.mealId}`, {
                    method: "POST",
                    credentials: "include",
                    cache: "force-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        } else {
                            throw new Error("");
                        }
                    })
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => console.error(err))
            );
            // setPlansPromise(
            //     new Promise((res, rej) => {
            //         setTimeout(() => {}, 60000);
            //     })
            // );
        }
    }, []);

    // if (!predictResult?.id) {
    //     throw new Error("Predict result is not found");
    // } else
    if (!plansPromise) {
        return null;
    } else {
        return <div className="text-red-500">Fetched successfully</div>;
    }
}

export default PickPage;
