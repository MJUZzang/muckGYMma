import Image from "next/image";
import React from "react";
import exampleImage from "@/_images/pooh.jpg";

function Page() {
    return (
        <div className="grid grid-cols-3 gap-1 md:gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="aspect-square overflow-clip">
                    <Image src={exampleImage} alt="avatar" />
                </div>
            ))}
        </div>
    );
}

export default Page;
