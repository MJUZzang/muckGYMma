"use client";

import React, { use } from "react";
import { useAppSelector } from "@/../lib/hooks";
import { selectPredictResult } from "@/../lib/slices/predictSlice";
import { backendUrl } from "@/_utils/urls";

function PlanSelectionPage() {
    const predictResult = useAppSelector(selectPredictResult);
    use(
        fetch(`${backendUrl}/api/task/ask/${predictResult?.id}`, {
            method: "POST",
            credentials: "include",
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

    return <div>PlanSelectionPage</div>;
}

export default PlanSelectionPage;
