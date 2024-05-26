import Shycat from "@/_images/Shycat";
import React from "react";

interface NoDataProps {
    text: string;
}

function NoData({ text }: NoDataProps) {
    return (
        <div className="mt-10">
            <div className="max-w-[400px] mx-auto w-full">
                <Shycat />
            </div>
            <div className="text-center text-app-font-4 text-sm font-semibold relative bottom-3">
                <p>{text}</p>
            </div>
        </div>
    );
}

export default NoData;
