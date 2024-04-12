"use client";

import Camera from "@/_images/Camera";
import { backendUrl } from "@/_utils/urls";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../lib/hooks";
import { setPredict } from "../../lib/slices/predictSlice";

interface Props {
    className?: string;
}

function FoodPicture(props: Props) {
    const inputRef = React.createRef<HTMLInputElement>();
    const router = useRouter();
    const dispatch = useAppDispatch();

    function handleUpload(e: FormEvent<HTMLInputElement>) {
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0];
            const formData = new FormData();
            formData.append("file", file);

            fetch(`${backendUrl}/api/food/predict`, {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("Error occured while uploading image.");
                    }
                })
                .then((data) => {
                    console.log(data);
                    dispatch(setPredict(data));
                    router.push(`/prediction`);
                })
                .catch((err) => console.error(err));
        } else {
            console.error("No file selected.");
        }
    }

    function handleClicked() {
        inputRef.current?.click();
    }

    return (
        <>
            <input
                ref={inputRef}
                className="hidden"
                type="file"
                onInput={handleUpload}
            />
            <div onClick={handleClicked} className={`${props.className}`}>
                <Camera />
            </div>
        </>
    );
}

export default FoodPicture;
