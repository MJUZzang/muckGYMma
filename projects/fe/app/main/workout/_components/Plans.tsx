"use client";

import React, { useEffect } from "react";
import Plan from "@/main/workout/_components/Plan";
import Link from "next/link";
import { PlanInfo } from "@/_types/Plan";

interface PlansProps {
    plans: PlanInfo[];
}

const Plans = ({ plans }: PlansProps) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-show-plan");
                }
            });
        });

        const taskElements = document.querySelectorAll(".task");
        taskElements.forEach((element) => {
            observer.observe(element);
        });
    }, []);

    return (
        <div className="space-y-3 mt-3 mb-6 h-full">
            {plans.map((plan, index) => (
                <Link key={index} className="block" href="/plan-info">
                    <Plan
                        className={`task py-6 translate-x-[100%]`}
                        plan={plan}
                    />
                </Link>
            ))}
        </div>
    );
};

export default Plans;
