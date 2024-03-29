import React from "react";

interface WorkoutProps {
    className?: string;
}

const Workout: React.FC<WorkoutProps> = (props) => {
    return (
        <svg
            width="30"
            height="29"
            viewBox="0 0 30 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_201_75041)">
                <path
                    d="M2.25561 19.8127H3.75561V18.1604H2.26733C1.93921 18.1604 1.70483 17.9143 1.70483 17.5979V9.87525C1.70483 9.54712 1.93921 9.28931 2.26733 9.28931H3.75561V7.63696H2.25561C1.01343 7.63696 0.0524902 8.5979 0.0524902 9.84009V17.6213C0.0524902 18.8518 1.01343 19.8127 2.25561 19.8127ZM6.05249 22.4026H6.88452C8.84155 22.4026 9.97827 21.2307 9.97827 19.1799V8.30493C9.97827 6.25415 8.85327 5.05884 6.90796 5.05884H5.91187C4.10718 5.05884 3.06421 6.25415 3.06421 8.30493V19.1799C3.06421 21.2307 4.15405 22.4026 6.05249 22.4026ZM6.07593 20.633C5.30249 20.633 4.83374 20.094 4.83374 19.1799V8.30493C4.83374 7.37915 5.25561 6.82837 5.94702 6.82837H6.8728C7.70483 6.82837 8.20874 7.37915 8.20874 8.30493V19.1799C8.20874 20.094 7.70483 20.633 6.84937 20.633H6.07593ZM9.67358 12.7698H20.0798V11.0002H9.67358V12.7698ZM9.67358 16.4494H20.0798V14.6799H9.67358V16.4494ZM22.8689 22.4026H23.7009C25.5994 22.4026 26.6892 21.2307 26.6892 19.1799V8.30493C26.6892 6.25415 25.6463 5.05884 23.8298 5.05884H22.8455C20.8884 5.05884 19.7752 6.25415 19.7752 8.30493V19.1799C19.7752 21.2307 20.9119 22.4026 22.8689 22.4026ZM22.9041 20.633C22.0486 20.633 21.5447 20.094 21.5447 19.1799V8.30493C21.5447 7.37915 22.0369 6.82837 22.8806 6.82837H23.8064C24.4978 6.82837 24.9197 7.37915 24.9197 8.30493V19.1799C24.9197 20.094 24.4509 20.633 23.6775 20.633H22.9041ZM25.9978 19.8127H27.4978C28.74 19.8127 29.7009 18.8518 29.7009 17.6213V9.84009C29.7009 8.5979 28.74 7.63696 27.4978 7.63696H25.9978V9.28931H27.4861C27.8025 9.28931 28.0486 9.54712 28.0486 9.87525V17.5979C28.0486 17.9143 27.8025 18.1604 27.4861 18.1604H25.9978V19.8127Z"
                    fill="black"
                    fill-opacity="0.85"
                />
            </g>
            <defs>
                <clipPath id="clip0_201_75041">
                    <rect
                        width="29.6484"
                        height="17.3789"
                        fill="white"
                        transform="translate(0.0524902 5.05884)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

export default Workout;
