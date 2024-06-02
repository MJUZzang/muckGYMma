"use client";

import { backendUrl } from "@/_utils/urls";
import { Dosis, Noto_Sans_KR } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});
const dosis = Dosis({
    subsets: ["latin"],
});

function Water() {
    const [amount, setAmount] = useState(0);
    const amountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`${backendUrl}/api/waters/today`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch ");
                }
            })
            .then((data: number) => {
                if (data) {
                    setAmount(data);
                } else {
                    throw new Error(
                        "Failed to fetch the amount of water today."
                    );
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (amountRef.current) {
            amountRef.current.style.width = `${(amount / 2000) * 100}%`;
        }
    }, [amount]);

    function addWater() {
        fetch(`${backendUrl}/api/waters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ amount: 200 }),
        })
            .then((res) => {
                if (res.ok) {
                    setAmount((prev) => prev + 200);
                } else {
                    throw new Error("Failed to add water.");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div className={`${notoSansKr.className}`}>
            <p className="text-app-font-1 font-semibold">물 섭취</p>

            <div className="mt-3 flex items-end">
                <p className="text-3xl font-semibold text-app-font-2">{amount / 1000}</p>
                <p className="">/ 2L</p>
            </div>

            <div className="mt-3">
                <div className="h-[10px] rounded-3xl bg-app-bg-2" />
                <div
                    ref={amountRef}
                    className="relative bottom-[10px] h-[10px] rounded-3xl bg-[#90b5fe]
                transition-all duration-700"
                />
            </div>

            <div
                className={`flex gap-3 items-center ${dosis.className} h-[45px]`}
            >
                <div
                    className="w-full bg-[#dfeaff] text-[#007aff] rounded-lg text-center 
                    h-full flex justify-center items-center gap-1"
                >
                    <div className="text-3xl relative bottom-1" onClick={() => addWater()}>+</div>
                    <div className="text-xl">200ml</div>
                </div>

                <div className="bg-[#dfeaff] text-[#007aff] rounded-lg px-3 text-3xl h-full">
                    <div className="px-1">-</div>
                </div>
            </div>
        </div>
    );
}

export default Water;
