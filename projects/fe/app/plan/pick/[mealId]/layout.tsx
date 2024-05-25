import React from "react";

interface PickLayoutProps {
    children?: React.ReactNode;
}

function PickLayout({ children }: PickLayoutProps) {
    return <div>qwe{children}</div>;
}

export default PickLayout;
