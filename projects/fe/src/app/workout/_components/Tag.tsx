import React from "react";

interface TagProps {
    children: React.ReactNode;
    isUrgent?: boolean;
    className?: string;
}

const Tag:React.FC<TagProps> = (props) => {
    return (
        <div className={`text-xs px-2 py-1 rounded text-white
        ${props.isUrgent ? "bg-red-400" : "bg-orange1/80"}
        ${props.className}`}>
            {props.children}
        </div>
    );
};

export default Tag;
