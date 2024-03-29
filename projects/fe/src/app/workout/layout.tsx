import React from "react";
import HeaderTop from "@/app/_components/HeaderTop";

interface WorkoutLayoutProps {
    children: React.ReactNode;
}

const WorkoutLayout: React.FC<WorkoutLayoutProps> = (props) => {
    return (
        <>
            <HeaderTop>
                <p>Workout</p>
            </HeaderTop>

            {/* Spacer for Header */}
            <div className="w-[1px] h-[50px]" />

            {props.children}
        </>
    );
};

export default WorkoutLayout;
