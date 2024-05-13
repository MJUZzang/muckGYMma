import Muscle from "@/_images/Muscle";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
    return (
        <>
            <div className="mb-[50px] cursor-pointer">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Link
                        key={i}
                        href="/plan-info"
                        className="pl-2 pr-4 py-2 flex items-center gap-2 border-b-white/10 border-b-[1px] hover:bg-white/10 transition duration-200"
                    >
                        <Muscle />
                        <div>
                            <p className="text-app-font-2">Gym workout</p>
                            <p className="text-app-font-2">320kcal</p>
                            <p className="text-app-font-2">
                                완료일: 2022-01-01
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Page;
