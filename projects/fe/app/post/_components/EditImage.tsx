"use client";

import React, { TouchEvent, useEffect, useRef, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { getCroppedImg } from "@/_utils/canvas";
import { Slider } from "@/_components/shadcn/ui/slider";

interface EditImageProps {
    imageSrc: string;
    onCrop: (croppedImage: string) => void;
}

const EditImage = ({ imageSrc, onCrop }: EditImageProps) => {
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
        clearTimeout(zoomTimeoutRef.current);
        clearTimeout(touchTimeoutRef.current);
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
        <div className="absolute top-[45px] left-0 w-full h-[100dvh]">
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
                    <div className="zoom-hint">
                        <p>
                            Use ⌘ + scroll (or ctrl + scroll) to zoom the image
                        </p>
                    </div>
                )}
                {showMultiTouchHint && (
                    <div className="touch-hint">
                        <p>Use 2 fingers to interact with the image</p>
                    </div>
                )}
            </div>
            <Slider
                defaultValue={[zoom]}
                value={[zoom]}
                max={3}
                min={1}
                step={0.01}
                onValueChange={(value) => setZoom(value[0])}
            />
            <Slider
                defaultValue={[rotation]}
                value={[rotation]}
                max={360}
                min={0}
                step={0.1}
                onValueChange={(value) => setRotation(value[0])}
            />
            <button
                onClick={() => {
                    showCroppedImage();
                }}
            >
                완료
            </button>
        </div>
    );
};

export default EditImage;
