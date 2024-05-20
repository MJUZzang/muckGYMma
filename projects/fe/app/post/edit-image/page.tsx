"use client";

import React, { useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { getOrientation } from "get-orientation/browser";
import {
    ORIENTATION_TO_ANGLE,
    getCroppedImg,
    getRotatedImage,
} from "@/_utils/canvas";
import { Slider } from "@/_components/shadcn/ui/slider";

function readFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

const UploadPostPage = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

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
            console.log("donee", { croppedImage });
            setCroppedImage(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

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
                } catch (e) {
                    console.warn("failed to detect the orientation");
                    setImageSrc(imageDataUrl);
                }
            }
        }
    };

    return (
        <div>
            {imageSrc && (
                <>
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
                </>
            )}

            <input type="file" onChange={onFileChange} accept="image/*" />
        </div>
    );
};

export default UploadPostPage;
