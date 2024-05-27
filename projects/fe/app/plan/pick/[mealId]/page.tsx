"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/../lib/hooks";
import { selectPredictResult } from "@/../lib/slices/predictSlice";
import { useParams } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Dosis, Noto_Sans_KR } from "next/font/google";
import Shycat from "@/_images/Shycat";
import { PlanInfo } from "@/_types/Plan";
import ConfirmModal from "@/plan/pick/[mealId]/_components/ConfirmModal";
import { useRouter } from "next/navigation";
import { backendUrl, frontUrl } from "@/_utils/urls";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["400", "700"],
});
const dosis = Dosis({
    subsets: ["latin"],
    weight: ["400", "700"],
});

function PickPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emblaRef] = useEmblaCarousel({ loop: false });
    const predictResult = useAppSelector(selectPredictResult);
    const [plansPromise, setPlansPromise] = useState<Promise<void> | null>(
        null
    );
    const router = useRouter();
    const [selectedPlanIdx, setSelectedPlanIdx] = useState<number | null>(null);
    const params = useParams();
    const [plans, setPlans] = useState<PlanInfo[]>([]);

    const mealId = params.mealId;

    if (plansPromise) use(plansPromise!);

    useEffect(() => {
        if (!plansPromise) {
            setPlansPromise(
                fetch(`${backendUrl}/api/task/ask/${mealId}`, {
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
                    .then((data: { plans: PlanInfo[] }) => {
                        console.log(data);
                        if (data) {
                            setPlans(data.plans);
                        }
                    })
                    .catch((err) => console.error(err))
            );
            // setPlansPromise(
            //     new Promise((res, rej) => {
            //         setTimeout(() => {
            //             res();
            //         }, 1022222);
            //     })
            // );
        }
    }, []);

    function handleSubmit() {
        if (selectedPlanIdx === null) {
            console.error("selectedPlanIdx does not exist");
            return;
        }

        const planToSubmit = {
            type: plans[selectedPlanIdx].type,
            workouts: plans[selectedPlanIdx].workouts,
        };

        if (!planToSubmit.workouts) {
            console.error("workouts does not exist");
            return;
        }

        if (planToSubmit.type !== "헬스") {
            planToSubmit.type = planToSubmit.workouts[0].name;
        }

        fetch(`${backendUrl}/api/plans/add/${mealId}`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...planToSubmit }),
        })
            .then((res) => {
                if (!res.ok) {
                    console.error("failed");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                if (data) {
                    // router.push 사용하지 않고 webapi로 /main/workout 으로 페이지 이동
                    window.location.href = `${frontUrl}/main/workout`;
                }
            })
            .catch((err) => console.error(err));
    }

    if (!plansPromise) {
        return null;
    } else if (plans.length === 0) {
        throw new Error("Failed to fetch plans.");
    } else {
        return (
            <>
                <ConfirmModal
                    isModalOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onOkClik={() => {
                        handleSubmit();
                    }}
                    planIdx={selectedPlanIdx}
                />

                <div className={`${notoSansKr.className} pt-7`}>
                    <div className="w-full max-w-[400px] mx-auto">
                        <Shycat />
                    </div>

                    <div className="text-app-font-3 space-y-1">
                        <p className="text-center text-xl font-semibold">
                            꾸미가 운동 플랜을 만들었어요!
                        </p>

                        <p className="text-center text-base">
                            아래에서 원하는 운동 플랜을 선택해주세요.
                        </p>
                    </div>

                    <div
                        ref={emblaRef}
                        className="overflow-hidden flex flex-col mt-5"
                    >
                        <div className="flex text-app-font-2">
                            {plans.map((plan, idx) => (
                                <div
                                    key={idx}
                                    className="h-fit bg-app-bg-1 shrink-0 grow-0 rounded-lg cursor-pointer
                                    px-2 py-3 first:ml-[10vw] last:mr-[10vw] ml-[5vw] w-[65vw]"
                                    onClick={() => {
                                        setSelectedPlanIdx(idx);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <div className="w-[55vw] mx-auto">
                                        <p className="text-left text-xl text-app-blue-1">
                                            {idx + 1}번
                                        </p>

                                        <p className="mt-3 text-lg text-app-font-4 text-left font-semibold">
                                            {plan.type}
                                        </p>

                                        <ul className="mt-2 text-sm list-disc list-inside space-y-2">
                                            {plan.workouts?.map(
                                                (workout, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-app-font-5"
                                                    >
                                                        <div className="inline-flex text-sm text-app-font-4">
                                                            <p>
                                                                {workout.name}
                                                            </p>
                                                            {workout.weight && (
                                                                <>
                                                                    <p>
                                                                        &nbsp;(
                                                                    </p>
                                                                    <p
                                                                        className={`${dosis.className}`}
                                                                    >
                                                                        {
                                                                            workout.weight
                                                                        }
                                                                    </p>
                                                                    <p>kg)</p>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="pl-5 text-app-font-5 flex">
                                                            <p
                                                                className={`${dosis.className}`}
                                                            >
                                                                {workout.set}
                                                            </p>
                                                            <p>세트 x</p>
                                                            &nbsp;
                                                            <p
                                                                className={`${dosis.className}`}
                                                            >
                                                                {
                                                                    workout.repeatation
                                                                }
                                                            </p>
                                                            <p>회</p>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default PickPage;
