import SummaryGraphs from "@/analysis/_components/SummaryGraphs";
import HeatMap from "@/analysis/_components/HeatMap";
import StrengthWeaknessesChart from "@/analysis/_components/StrengthWeaknessesChart";
import VolumneProgressChart from "@/analysis/VolumneProgressChart";

const Analysis = () => {
    return (
        <>
            <div className="max-w-[780px] mx-auto text-white space-y-10 pb-7">
                <SummaryGraphs />
                {/* <HeatMap /> */}
                {/* <StrengthWeaknessesChart /> */}
                {/* <VolumneProgressChart /> */}
            </div>
        </>
    );
};

export default Analysis;
