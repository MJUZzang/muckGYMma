import HeaderBar from "@/app/_components/HeaderBar";
import GraphGroup from "./_components/GraphGroup";

const Analysis = () => {
    return (
        <>
            {/* Header */}
            <HeaderBar>
                <p>Analysis</p>
            </HeaderBar>

            {/* Spacer for Header */}
            <div className="w-[1px] h-[50px]" />

            <GraphGroup />
        </>
    );
};

export default Analysis;
