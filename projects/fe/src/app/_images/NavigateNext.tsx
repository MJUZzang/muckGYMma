import React from "react";

interface NavigateNextProps {
    className?: string;
    width?: number;
    hight?: number;
}

const NavigateNext: React.FC<NavigateNextProps> = (props) => {
    return (
        <svg
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            height={props.hight ? props.hight : 24}
            viewBox="0 -960 960 960"
            width={props.width ? props.width : 24}
        >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
    );
};

export default NavigateNext;
