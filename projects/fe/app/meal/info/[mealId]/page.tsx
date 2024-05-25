import Image from "next/image";
import { Noto_Sans_KR, Dosis } from "next/font/google";
import { MealInfo } from "@/_types/Food";
import { backendUrl } from "@/_utils/urls";
import Link from "next/link";
import NavigateBackButton from "./_components/NavigateBackButton";
import { cookies } from "next/headers";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: "400",
});

const dosis = Dosis({
    subsets: ["latin"],
    weight: "400",
});

const dummyMeal: MealInfo = {
    id: 1,
    name: "닭갈비",
    kcal: 186.19,
    carbo: 12.83,
    protein: 13.8,
    fat: 9.04,
    sodium: 466.86,
    gram: 120.7,
    imageUrl:
        "https://muckgymma.s3.ap-northeast-2.amazonaws.com/food/2_%25EB%2596%25A1%25EB%25B3%25B6%25EC%259D%25B4.jpg",
    exercised: false,
    posted: false,
    planed: false,
    createdAt: new Date("2024-04-14T19:56:39.214108"),
};

interface MealInfoProps {
    params: { mealId: number };
}
async function MealInfoPage({ params }: MealInfoProps) {
    const mealId = params.mealId;
    let meal = dummyMeal;
    const cookieStore = cookies();

    // if (process.env.NODE_ENV !== "development") {
    if (mealId && !isNaN(mealId)) {
        await fetch(`${backendUrl}/api/foods/${mealId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                Cookie: cookieStore
                    .getAll()
                    .map((cookie) => {
                        return `${cookie.name}=${cookie.value}`;
                    })
                    .join("; "),
            },
        })
            .then((res) => {
                console.log(res.status);
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Failed to get meal info");
                }
            })
            .then((data) => {
                if (data) {
                    const convertedCreatedAt = new Date(data.createdAt);
                    meal = { ...data, createdAt: convertedCreatedAt };
                    console.log("meal: ", meal);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        return <div>잘못된 요청입니다.</div>;
    }
    // }

    return (
        <>
            <div
                className={`flex flex-col h-[100dvh] animate-page-enter px-3 ${notoSansKr.className}`}
            >
                <div className="mt-4">
                    <NavigateBackButton meal={meal} />

                    <p className="text-lg text-center font-semibold">
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
                    href={
                        meal.planed
                            ? `/post/write/${meal.id}`
                            : `/plan/pick-plan/${meal.id}`
                    }
                    className={`inline-block text-center w-full bg-app-blue rounded-lg py-2 font-semibold text-app-inverted-font 
                    active:scale-90 transition-all ${
                        meal.planed && meal.posted && "pointer-events-none"
                    }`}
                >
                    {!meal.planed && "운동계획 만들기"}
                    {meal.planed && !meal.posted && "식사일기 작성하기"}
                    {meal.planed && meal.posted && "식사일기 보러가기"}
                </Link>
            </div>
        </>
    );
}

export default MealInfoPage;
