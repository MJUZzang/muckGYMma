import Image from "next/image";
import Link from "next/link";
import { Noto_Sans_KR, Dosis } from "next/font/google";
import NavigateBackButton from "./_components/NavigateBackButton";
import {
    fetchMeal,
    findPlanIdByMealId,
    findPostIdByMealId,
} from "@/main/profile/_utils/meal";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

const dosis = Dosis({
    subsets: ["latin"],
    weight: "400",
});

interface MealInfoProps {
    params: { mealId: number };
}

async function MealInfoPage({ params }: MealInfoProps) {
    const mealId = params.mealId;

    if (!mealId || isNaN(mealId)) {
        return <div>잘못된 요청입니다.</div>;
    }
    const mealPromise = fetchMeal(mealId);
    const planIdPromise = findPlanIdByMealId(mealId);
    const postIdPromise = findPostIdByMealId(mealId);

    const [meal, planId, postId] = await Promise.all([
        mealPromise,
        planIdPromise,
        postIdPromise,
    ]);

    function getButtonLink() {
        if (!meal.planed) {
            return `/plan/pick/${meal.id}`;
        } else if (meal.exercised && !meal.posted) {
            return `/post/write?mealId=${meal.id}&img=${meal.imageUrl}`;
        } else if (meal.posted) {
            return `/post/${postId}`;
        } else {
            return `/plan/info/${planId}`;
        }
    }

    return (
        <>
            <div
                className={`flex flex-col h-[100dvh] animate-page-enter px-3 ${notoSansKr.className}`}
            >
                <div className="mt-4 grid grid-cols-3">
                    <NavigateBackButton meal={meal} />

                    <p className="text-base w-full text-center font-semibold text-nowrap">
                        {meal.name}
                    </p>
                </div>

                <div className="mx-auto mt-4 px-5 max-w-[625px] w-full">
                    <Image
                        src={meal.imageUrl}
                        width={300}
                        height={300}
                        alt="food"
                        className="w-full rounded-2xl"
                    />
                    <p
                        className={`text-right text-sm text-app-font-4 mr-2 mt-1 ${dosis.className}`}
                    >
                        {meal.createdAt.toLocaleString()}
                    </p>
                    <div className="flex text-app-font-1 text-lg items-end font-medium">
                        <p>총</p>
                        <p
                            className={`${dosis.className} mx-1 text-2xl font-semibold`}
                        >
                            {meal.kcal}
                        </p>
                        <p>kcal</p>

                        <p className="ml-1 text-xs text-app-font-3">
                            / {meal.gram}g
                        </p>
                    </div>

                    <div className="flex mt-4 text-xs text-app-font-3">
                        <p>나트륨:&nbsp;</p>
                        <p className={`${dosis.className}`}>{meal.sodium}</p>
                        mg
                    </div>

                    {/* 영양성분 표시 */}
                    <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="bg-gray-500 text-app-inverted-font text-sm rounded-lg p-2">
                            탄수화물
                            <p
                                className={`text-base font-semibold ${dosis.className}`}
                            >
                                {meal.carbo}g
                            </p>
                        </div>
                        <div className="bg-gray-700 text-app-inverted-font text-sm rounded-lg p-2">
                            단백질
                            <p
                                className={`text-base font-semibold ${dosis.className}`}
                            >
                                {meal.protein}g
                            </p>
                        </div>
                        <div className="bg-gray-800 text-app-inverted-font text-sm rounded-lg p-2">
                            지방
                            <p
                                className={`text-base font-semibold ${dosis.className}`}
                            >
                                {meal.fat}g
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 w-full px-3 pb-3">
                <Link
                    href={getButtonLink()}
                    className={`inline-block text-center w-full bg-app-blue rounded-lg py-2 font-semibold text-app-inverted-font 
                    active:scale-90 transition-all`}
                >
                    {!meal.planed && "운동플랜 만들기"}
                    {meal.exercised && !meal.posted && "식사일기 작성하기"}
                    {meal.posted && "식사일기 보러가기"}
                    {meal.planed && !meal.exercised && "운동플랜 하러가기"}
                </Link>
            </div>
        </>
    );
}

export default MealInfoPage;
