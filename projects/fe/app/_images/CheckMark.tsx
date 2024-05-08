import React from "react";

interface CheckMarkProps {
    className?: string;
    color: string;
}

function CheckMark({ className, color }: CheckMarkProps) {
    return (
        <svg
            width={29}
            height={29}
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${className}`}
        >
            <g clipPath="url(#clip0_201_99031)">
                <path
                    d="M11.6868 24.7271C12.1907 24.7271 12.5891 24.5044 12.8704 24.0708L23.9445 6.6333C24.1555 6.29346 24.2375 6.03565 24.2375 5.76612C24.2375 5.12158 23.8156 4.69971 23.1711 4.69971C22.7023 4.69971 22.4445 4.85205 22.1633 5.29737L11.6399 22.0669L6.17895 14.9185C5.88598 14.5083 5.59302 14.3443 5.17114 14.3443C4.50317 14.3443 4.04614 14.8013 4.04614 15.4458C4.04614 15.7154 4.16333 16.0201 4.38599 16.3013L10.468 24.0474C10.8196 24.5044 11.1829 24.7271 11.6868 24.7271Z"
                    fill={color}
                    fillOpacity="0.85"
                />
            </g>
            <defs>
                <clipPath id="clip0_201_99031">
                    <rect
                        width="20.1914"
                        height="20.6836"
                        fill="white"
                        transform="translate(4.04614 4.04346)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}

export default CheckMark;
