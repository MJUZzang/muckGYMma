"use client";

import React, { useState } from "react";
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
        <div>
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
            />
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
