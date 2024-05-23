import React from "react";

interface LikeProps {
    className?: string;
    isLiked: boolean;
    onClick: () => void;
}

const Like: React.FC<LikeProps> = ({ isLiked, onClick, className }) => {
    return (
        <svg
            width={25}
            height={24}
            viewBox="0 0 25 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            className={`${className}`}
        >
            <path
                d="M12.6356 20.81C12.2956 20.93 11.7356 20.93 11.3956 20.81C8.49563 19.82 2.01562 15.69 2.01562 8.68998C2.01562 5.59998 4.50563 3.09998 7.57562 3.09998C9.39562 3.09998 11.0056 3.97998 12.0156 5.33998C13.0256 3.97998 14.6456 3.09998 16.4556 3.09998C19.5256 3.09998 22.0156 5.59998 22.0156 8.68998C22.0156 15.69 15.5356 19.82 12.6356 20.81Z"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Like;
