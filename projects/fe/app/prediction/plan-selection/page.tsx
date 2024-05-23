"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/../lib/hooks";
import { selectPredictResult } from "@/../lib/slices/predictSlice";
import { backendUrl } from "@/_utils/urls";

function PlanSelectionPage() {
    const predictResult = useAppSelector(selectPredictResult);
    const [plansPromise, setPlansPromise] = useState<Promise<void> | null>(null);

    if (plansPromise) use(plansPromise!);

    useEffect(() => {
        if (!plansPromise) {
            // setPromiseRef(
            //     fetch(`${backendUrl}/api/task/ask/${predictResult?.id}`, {
            //         method: "POST",
            //         credentials: "include",
            //         cache: "force-cache",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     })
            //         .then((res) => {
            //             if (res.ok) {
            //                 return res.json();
            //             } else {
            //                 throw new Error("");
            //             }
            //         })
            //         .then((data) => {
            //             console.log(data);
            //         })
            //         .catch((err) => console.error(err))
            // );
            setPlansPromise(
                new Promise((res, rej) => {
                    setTimeout(() => {}, 60000);
                })
            );
        }
    }, []);

    // if (!predictResult?.id) {
    //     throw new Error("Predict result is not found");
    // } else
     if (!plansPromise) {
        return null;
    } else {
        return <div className="text-red-500">PlanSelectionPage</div>;
    }
}

export default PlanSelectionPage;
