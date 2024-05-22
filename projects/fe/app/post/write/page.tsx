"use client";

import AddCircle from "@/_images/AddCircle";
import AddCircleV2 from "@/_images/AddCircleV2";
import Camera from "@/_images/Camera";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import EditImage from "@/post/_components/EditImage";
import { getOrientation } from "get-orientation/browser";
import { ORIENTATION_TO_ANGLE, getRotatedImage } from "@/_utils/canvas";
import Button from "@/_components/Button";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

function readFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

function WritePage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const imgSets = [
        useState<string | null>(null),
        useState<string | null>(null),
        useState<string | null>(null),
        useState<string | null>(null),
        useState<string | null>(null),
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const [text, setText] = useState("");

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageDataUrl = await readFile(file);

            if (typeof imageDataUrl === "string") {
                try {
                    // apply rotation if needed
                    const orientation = await getOrientation(file);
                    const rotation = ORIENTATION_TO_ANGLE[orientation];
                    if (rotation) {
                        const rotatedImageDataUrl = await getRotatedImage(
                            imageDataUrl,
                            rotation
                        );
                        setImageSrc(rotatedImageDataUrl);
                    } else {
                        setImageSrc(imageDataUrl);
                    }
                    setIsEditing(true);
                } catch (e) {
                    console.warn("failed to detect the orientation");
                    setImageSrc(imageDataUrl);
                    setIsEditing(true);
                }
            }
            e.target.value = "";
        }
    };

    return (
        <div className={`flex flex-col min-h-[100dvh] absolute top-0 pt-[55px] w-full ${notoSansKr.className}`}>
            <div
                ref={emblaRef}
                className="overflow-hidden flex flex-col mt-5 w-full h-fit"
            >
                <div className="flex text-black">
                    {activeIndex <= 3 && (
                        <button
                            className="aspect-square ml-[10vw] last:mr-[10vw] h-[40dvh] shrink-0 grow-0 
                            border-2 border-app-bg-2 shadow-lg bg-gray-50 rounded-2xl
                            flex justify-center items-center"
                            onClick={() => {
                                if (inputRef.current) {
                                    inputRef.current.click();
                                }
                            }}
                        >
                            <Camera className="fill-stone-200" size={70} />
                        </button>
                    )}

                    {Array.from({ length: activeIndex }).map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square h-[40dvh] shrink-0 grow-0 overflow-clip
                            border-2 border-app-blue-3 shadow-lg bg-gray-50 rounded-2xl
                            last:mr-[10vw] ml-[5vw]
                            flex justify-center items-center`}
                        >
                            <Image
                                src={imgSets[i][0]!}
                                layout="fill"
                                alt="image"
                                className="w-full h-full rounded-2xl !relative object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-3 mt-auto flex flex-col gap-1">
                <p className="text-lg text-app-font-4 font-semibold">
                    포스트 내용
                </p>
                <textarea
                    maxLength={700}
                    onChange={(e) => setText(e.target.value)}
                    rows={1}
                    className="w-full h-[25dvh] py-2 rounded-xl px-3 bg-app-bg-2 text-app-font 
                    focus:outline-none resize-none overflow-y-auto"
                    placeholder="오늘 하루를 기록해보세요."
                />
            </div>

            <div className="bg-app-bg w-full pt-3 pb-6 px-3 mt-2 border-t-[1px] border-app-bg-3">
                <Button onClick={() => {}} className="bg-app-blue-1">
                    포스트 작성완료
                </Button>
            </div>

            <input
                ref={inputRef}
                type="file"
                onChange={onFileChange}
                accept="image/*"
                className="hidden"
            />

            {isEditing && (
                <EditImage
                    imageSrc={imageSrc!}
                    onClose={() => {
                        setIsEditing(false);
                    }}
                    onCrop={(croppedImage) => {
                        imgSets[activeIndex][1](croppedImage);
                        setActiveIndex(activeIndex + 1);
                        setIsEditing(false);
                    }}
                />
            )}
        </div>
    );
}

export default WritePage;
