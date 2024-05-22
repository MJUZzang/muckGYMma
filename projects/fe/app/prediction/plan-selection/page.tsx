"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/../lib/hooks";
import { selectPredictResult } from "@/../lib/slices/predictSlice";
import { backendUrl } from "@/_utils/urls";

function PlanSelectionPage() {
    const predictResult = useAppSelector(selectPredictResult);
    const [promiseRef, setPromiseRef] = useState<Promise<void> | null>(null);

    if (promiseRef) use(promiseRef!);

    useEffect(() => {
        if (!promiseRef) {
            setPromiseRef(
                fetch(`${backendUrl}/api/task/ask/${predictResult?.id}`, {
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
        }
    }, []);
    return <div>PlanSelectionPage</div>;
}

export default PlanSelectionPage;
