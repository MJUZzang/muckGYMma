import Muscle from "@/_images/Muscle";
import React from "react";

function Page() {
    return (
        <>
            <div className="mb-[50px]">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="pl-2 pr-4 py-2 flex items-center gap-2 border-b-white/30 border-b-[1px] hover:bg-white/10 transition duration-200"
                    >
                        <Muscle className="" />
                        <div>
                            <p className="text-white/90">Gym workout</p>
                            <p className="text-white/90">320kcal</p>
                            <p className="text-white/90">
                                Completed: 2022-01-01
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Page;
