import React from "react";

interface SettingElementProps {
    children: React.ReactNode;
    title: string;
}

const SettingElement: React.FC<SettingElementProps> = (props) => {
    return (
        <div className="py-3 flex flex-row justify-between items-center ">
            <p className="text-app-font-3 font-semibold">{props.title}</p>
            <div className="flex flex-row items-center text-app-font-3 fill-app-font-4">{props.children}</div>
        </div>
    );
};

export default SettingElement;
