import SummaryGraphs from "@/analysis/_components/SummaryGraphs";
import HeatMap from "@/analysis/_components/HeatMap";
import StrengthWeaknessesChart from "@/analysis/_components/StrengthWeaknessesChart";
import VolumneProgressChart from "@/analysis/VolumneProgressChart";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
});

const Analysis = () => {
    return (
        <>
            <div
                className={`max-w-[780px] mx-auto text-app-font-3 space-y-10 pb-7 ${notoSansKr.className}`}
            >
                <SummaryGraphs />
                <HeatMap />
                {/* <StrengthWeaknessesChart />
                <VolumneProgressChart /> */}
            </div>
        </>
    );
};

export default Analysis;
