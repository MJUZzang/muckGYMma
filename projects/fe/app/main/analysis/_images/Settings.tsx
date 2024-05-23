import React from "react";

interface SettingsProps {
    className?: string;
}

function Settings({ className }: SettingsProps) {
    return (
        <svg
            width={25}
            height={24}
            viewBox="0 0 25 24"
            className={`${className}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.01562 10C3.91562 10 3.01562 10.9 3.01562 12C3.01562 13.1 3.91562 14 5.01562 14C6.11563 14 7.01562 13.1 7.01562 12C7.01562 10.9 6.11563 10 5.01562 10Z"
                strokeWidth="1.5"
            />
            <path
                d="M19.0156 10C17.9156 10 17.0156 10.9 17.0156 12C17.0156 13.1 17.9156 14 19.0156 14C20.1156 14 21.0156 13.1 21.0156 12C21.0156 10.9 20.1156 10 19.0156 10Z"
                strokeWidth="1.5"
            />
            <path
                d="M12.0156 10C10.9156 10 10.0156 10.9 10.0156 12C10.0156 13.1 10.9156 14 12.0156 14C13.1156 14 14.0156 13.1 14.0156 12C14.0156 10.9 13.1156 10 12.0156 10Z"
                strokeWidth="1.5"
            />
        </svg>
    );
}

export default Settings;
