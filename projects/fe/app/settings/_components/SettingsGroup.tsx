import React from "react";

interface SettingsGroupProps {
    title: string;
    children: React.ReactNode;
}

const SettingsGroup: React.FC<SettingsGroupProps> = (props) => {
    return (
        <>
            <p className="pt-7 pb-3 text-app-font-2 font-semibold">
                {props.title}
            </p>
            <div className="pl-10 text-app-font-3">
                {props.children}
            </div>
        </>
    );
};

export default SettingsGroup;
