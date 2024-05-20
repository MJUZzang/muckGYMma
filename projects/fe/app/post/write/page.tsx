"use client";

import AddCircle from "@/_images/AddCircle";
import AddCircleV2 from "@/_images/AddCircleV2";
import Camera from "@/_images/Camera";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

function WritePage() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    return (
        <div ref={emblaRef} className="overflow-hidden flex flex-col mt-5">
            <div className="flex text-black">
                <div className="aspect-square first:ml-[10vw] last:mr-[10vw] ml-[5vw] w-[60vw] shrink-0 grow-0 
                border-2 border-app-bg-2 shadow-lg bg-gray-50 rounded-2xl
                flex justify-center items-center">      
                    <Camera className="fill-stone-200" size={70}/>
                </div>
            </div>
        </div>
    );
}

export default WritePage;
