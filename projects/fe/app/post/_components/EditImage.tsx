"use client";

import React, { TouchEvent, useEffect, useRef, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "@/_utils/canvas";
import { Slider } from "@/_components/shadcn/ui/slider";
import Button from "@/_components/Button";
import { Noto_Sans_KR } from "next/font/google";
import ArrowBack from "@/_images/ArrowBack";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

interface EditImageProps {
    imageSrc: string;
    onCrop: (croppedImage: string) => void;
    onClose: () => void;
}

const EditImage = ({ imageSrc, onCrop, onClose }: EditImageProps) => {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null
    );
    const [showZoomHint, setShowZoomHint] = useState(false);
    const [showMultiTouchHint, setShowMultiTouchHint] = useState(false);
    const [removeTouchAction, setRemoveTouchAction] = useState(false);
    const zoomTimeoutRef = useRef<NodeJS.Timeout>();
    const touchTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const handlePopstate = () => {
            onClose();
        };

        history.pushState(null, "", location.href);
        window.addEventListener("popstate", handlePopstate);

        return () => {
            window.removeEventListener("popstate", handlePopstate);
            clearTimeout(zoomTimeoutRef.current);
            clearTimeout(touchTimeoutRef.current);
        };
    }, []);

    const onWheelRequest = (e: WheelEvent) => {
        // require the CTRL/⌘ key to be able to zoom with wheel
        if (e.ctrlKey || e.metaKey) {
            setShowZoomHint(false);
            return true;
        }

        setShowZoomHint(true);

        clearTimeout(zoomTimeoutRef.current);
        zoomTimeoutRef.current = setTimeout(() => setShowZoomHint(false), 2000);

        return false;
    };

    const onTouchRequest = (e: TouchEvent<HTMLDivElement>) => {
        // require 2 fingers to be able to interact with the image
        if (e.touches.length > 1) {
            setShowMultiTouchHint(false);
            setRemoveTouchAction(true);
            return true;
        }

        setShowMultiTouchHint(true);
        setRemoveTouchAction(false);

        clearTimeout(touchTimeoutRef.current);
        touchTimeoutRef.current = setTimeout(
            () => setShowMultiTouchHint(false),
            2000
        );

        return false;
    };

    const showCroppedImage = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            );
            if (croppedImage === null) {
                console.error("failed to crop image");
            } else {
                onCrop(croppedImage);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    return (
        <div
            className={`z-[40] absolute bg-app-bg top-0 left-0 w-full h-[100dvh] flex flex-col animate-page-enter ${notoSansKr.className}`}
        >
            <div className="grid grid-cols-3 px-2 h-[55px] bg-app-bg border-b-[1px] border-b-app-bg-2">
                <button
                    onClick={() => {
                        onClose();
                    }}
                    className="w-full flex justify-start items-center"
                >
                    {/* <XButton className="stroke-app-font-3" size={33} /> */}
                    <ArrowBack className="fill-app-font-3" size={23} />
                </button>
                <div className="w-full flex items-center justify-center font-semibold text-base text-app-font-3">
                    사진 추가
                </div>
                <div className="w-full flex justify-end items-center"></div>
            </div>``

            <div className="relative w-full aspect-square">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onRotationChange={setRotation}
                    onZoomChange={setZoom}
                    onWheelRequest={onWheelRequest}
                    onTouchRequest={onTouchRequest}
                />
                {showZoomHint && (
                    <div className="text-black z-[50] absolute w-full h-full flex justify-center items-center pointer-events-none">
                        <p className="bg-black/70 p-3 mx-3 rounded-sm text-white/90 text-lg text-pretty pointer-events-none">
                            ⌘ + 마우스휠 (또는 ctrl + 마우스휠) 로 확대/축소
                        </p>
                    </div>
                )}
                {!showZoomHint && showMultiTouchHint && (
                    <div className="text-black z-[49] absolute w-full h-full flex justify-center items-center pointer-events-none">
                        <p className="bg-black/70 p-3 mx-3 rounded-sm text-white/90 text-lg text-pretty pointer-events-none">
                            두 손가락으로 확대/축소, 회전
                        </p>
                    </div>
                )}
            </div>

            <div className="text-app-font-2 flex flex-col text-nowrap px-3 gap-3 mt-3">
                <div className="flex">
                    <div className="w-[75px]">확대</div>
                    <Slider
                        defaultValue={[zoom]}
                        value={[zoom]}
                        max={3}
                        min={1}
                        step={0.01}
                        onValueChange={(value) => setZoom(value[0])}
                    />
                </div>
                <div className="flex">
                    <div className="w-[75px]">회전</div>
                    <Slider
                        defaultValue={[rotation]}
                        value={[rotation]}
                        max={360}
                        min={0}
                        step={0.1}
                        onValueChange={(value) => setRotation(value[0])}
                    />
                </div>
            </div>

            <div className="mt-auto pt-3 pb-6 px-3 border-t-[1px] border-app-bg-3">
                <Button
                    onClick={() => {
                        showCroppedImage();
                    }}
                    className="bg-app-blue-1"
                >
                    완료
                </Button>
            </div>
        </div>
    );
};

export default EditImage;
