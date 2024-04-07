"use client";

import React, { useEffect } from "react";
import Tag from "@/app/workout/_components/Tag";

interface TagsProps {
    className?: string;
    time: Date;
}

const Tags: React.FC<TagsProps> = (props) => {
    const now = new Date().getTime();
    const distance = props.time.getTime() - now;

    const [leftDays, setLeftDays] = React.useState<number>(
        Math.floor(distance / (1000 * 60 * 60 * 24))
    );
    const [leftHours, setLeftHours] = React.useState<number>(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const [leftMinutes, setLeftMinutes] = React.useState<number>(
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    );
    const [leftSeconds, setLeftSeconds] = React.useState<number>(
        Math.floor((distance % (1000 * 60)) / 1000)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setLeftDays(Math.floor(distance / (1000 * 60 * 60 * 24)));

            setLeftHours(
                Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                )
            );

            setLeftMinutes(
                Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            );

            setLeftSeconds(Math.floor((distance % (1000 * 60)) / 1000));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Tag isUrgent={false}>
                {leftDays > 0
                    ? leftDays + "day"
                    : leftHours > 0
                    ? leftHours + "hr"
                    : leftMinutes > 0
                    ? leftMinutes + "min"
                    : leftSeconds > 0
                    ? leftSeconds + "sec"
                    : "0sec"}
            </Tag>
            <Tag className={`${leftDays !== 0 && "hidden"}`} isUrgent={leftDays === 0}>Urgent</Tag>
        </>
    );
};

export default Tags;
