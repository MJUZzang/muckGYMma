import React from "react";

interface SettingsGroupProps {
    title: string;
    children: React.ReactNode;
}

const SettingsGroup: React.FC<SettingsGroupProps> = (props) => {
    return (
        <>
            <p className="pt-7 pb-3 text-black dark:text-white">
                {props.title}
            </p>
            <div className="pl-10 text-black dark:text-white">
                {props.children}
            </div>
        </>
    );
};

export default SettingsGroup;
