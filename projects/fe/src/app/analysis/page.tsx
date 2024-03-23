import HeaderTop from "../_components/HeaderTop";
import GraphGroup from "./_components/GraphGroup";
import HeatMap from "./_components/HeatMap";
import StrengthWeaknessesChart from "./_components/StrengthWeaknessesChart";
import VolumneProgressChart from "./VolumneProgressChart";

const Analysis = () => {
    return (
        <>
            {/* Header */}
            <HeaderTop>
                <p>Analysis</p>
            </HeaderTop>

            {/* Spacer for Header */}
            <div className="w-[1px] h-[50px]" />

            <div className="mx-3">
                <p>7-Day Summary</p>
                <GraphGroup />

                <p className="mt-10">Streak Chart</p>
                <HeatMap />

                <p className="mt-10">Strengh & Weaknesses</p>
                <StrengthWeaknessesChart />

                <p className="mt-10">Volumne Progress</p>
                <VolumneProgressChart />
            </div>
        </>
    );
};

export default Analysis;
