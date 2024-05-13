import React from "react";

interface ToggleSwitchProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
    return (
        <div
            className="bg-stone-900 w-[50px] h-[29px] rounded-full transition-colors
                dark:bg-app-blue-950"
            onClick={props.onClick}
        >
            <div
                className="h-[24px] w-[24px] bg-white rounded-full relative left-[3px] transition-transform translate-y-[2px]
                    dark:translate-x-[21px]"
            />
        </div>
    );
};

export default ToggleSwitch;
