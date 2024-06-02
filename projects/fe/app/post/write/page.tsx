"use client";

import Camera from "@/_images/Camera";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import EditImage from "@/_components/EditImage";
import { getOrientation } from "get-orientation/browser";
import {
    ORIENTATION_TO_ANGLE,
    getRotatedImage,
    readFile,
    urlToBlobFile,
} from "@/_utils/canvas";
import Button from "@/_components/Button";
import { Noto_Sans_KR } from "next/font/google";
import { backendUrl } from "@/_utils/urls";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/../lib/hooks";
import { selectNickname } from "@/../lib/slices/userInfoSlice";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

function WritePage() {
    const searchParams = useSearchParams();
    const mealId = searchParams.get("mealId");
    const mealImage = searchParams.get("img");

    const router = useRouter();
    const nickname = useAppSelector(selectNickname);
    const inputRef = useRef<HTMLInputElement>(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const imgSets = [
        useState<string | null>(mealImage ? mealImage : null),
        useState<string | null>(null),
        useState<string | null>(null),
        useState<string | null>(null),
        useState<string | null>(null),
    ];
    const [activeIndex, setActiveIndex] = useState(mealId ? 1 : 0);
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
        <div
            className={`flex flex-col min-h-[100dvh] absolute top-0 pt-[55px] w-full ${notoSansKr.className}`}
        >
            <div
                ref={emblaRef}
                className="overflow-hidden flex flex-col mt-5 w-full h-fit pb-5"
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
                            border-2 border-app-bg-2 shadow-lg bg-gray-50 rounded-2xl
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
                <Button
                    className="bg-app-blue-1"
                    onClick={async () => {
                        // URL로부터 Blob 데이터를 가져와서 File 객체로 변환하고 FormData에 추가하는 예제
                        const formData = new FormData();

                        for (let i = 0; i < activeIndex; i++) {
                            const file: File | null = await urlToBlobFile(
                                imgSets[0][0]!,
                                "image.jpg"
                            )
                                .then((file) => {
                                    return file;
                                })
                                .catch((error) => {
                                    console.error(
                                        "Error fetching blob from URL:",
                                        error
                                    );
                                    return null;
                                });

                            if (!file) {
                                console.error("No file found.");
                                return;
                            }

                            formData.append("files", file);
                        }

                        formData.append("content", text);

                        fetch(`${backendUrl}/api/board/create`, {
                            method: "POST",
                            credentials: "include",
                            body: formData,
                        })
                            .then((res) => {
                                if (res.ok) {
                                    console.log("Post created successfully.");
                                    router.push(
                                        `/main/profile/${nickname}/posts`
                                    );
                                } else {
                                    throw new Error(
                                        "Error occured while uploading image."
                                    );
                                }
                            })
                            .catch((err) => console.error(err));
                    }}
                >
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
