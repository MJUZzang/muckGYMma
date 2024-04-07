import React from "react";

interface MuscleProps {
    className?: string;
}
const Muscle: React.FC<MuscleProps> = (props) => {
    return (
        <div className="bg-[#FFE7E9] p-2 rounded-full">
            <svg
                className={`${props.className}`}
                width="29"
                height="29"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10.685 18C11.41 15.375 13.945 13.5 16.865 13.81C19.645 14.105 21.855 16.45 21.995 19.24C22.03 19.975 21.93 20.68 21.715 21.335C21.585 21.735 21.195 22 20.77 22H5.87919C3.35501 22 1.46184 19.6907 1.95687 17.2155L4.99996 2H10.9999L12.9999 5.5L8.71499 8.565L7.49994 7"
                    stroke="#EAB7BC"
                    strokeWidth="2"
                    strokeMiterlimit="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M8.71976 8.56494L10.9998 16.9999"
                    stroke="#EAB7BC"
                    strokeWidth="2"
                    strokeMiterlimit="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default Muscle;
