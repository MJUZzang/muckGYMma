import SummaryGraphs from "@/main/analysis/_components/SummaryGraphs";
import HeatMap from "@/main/analysis/_components/HeatMap";
import { Noto_Sans_KR } from "next/font/google";
import Water from "./_components/Water";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

const Analysis = () => {
    return (
        <>
            <div
                className={`max-w-[780px] mx-auto text-app-font-3 space-y-10 pb-7 ${notoSansKr.className}`}
            >
                <Water />
                <SummaryGraphs />
                <HeatMap />
                {/* <StrengthWeaknessesChart />
                <VolumneProgressChart /> */}
            </div>
        </>
    );
};

export default Analysis;
