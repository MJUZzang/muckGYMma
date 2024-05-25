import { backendUrl } from "@/_utils/urls";
import { cookies } from "next/headers";

import img1 from "@/_images/닭갈비.jpg";
import img2 from "@/_images/삼겹살.jpg";
import img3 from "@/_images/떡볶이.jpg";
import img4 from "@/_images/버거.jpg";
import { MealInfo } from "@/_types/Meal";

const dummyData: MealInfo[] = [
    {
        id: 1,
        name: "닭갈비",
        kcal: 186.19,
        carbo: 12.83,
        protein: 13.8,
        fat: 9.04,
        sodium: 466.86,
        gram: 120.7,
        imageUrl: img1.src,
        exercised: false,
        posted: false,
        planed: false,
        createdAt: "2024-04-14T19:56:39.214108",
    },
    {
        id: 2,
        name: "삼겹살",
        kcal: 186.19,
        carbo: 12.83,
        protein: 13.8,
        fat: 9.04,
        sodium: 466.86,
        gram: 120.7,
        imageUrl: img2.src,
        exercised: false,
        posted: false,
        planed: false,
        createdAt: "2024-04-14T19:56:39.214108",
    },
];

export async function fetchMeals() {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/foods/eaten`, {
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
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Server responded with an error");
            }
        })
        .then((data: MealInfo[]) => {
            console.log(data);
            if (data) {
                return data;
            } else {
                throw new Error("No data received");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyData;
        });
}

export async function fetchMeal(mealId: number) {
    const cookieStore = cookies();

    return await fetch(`${backendUrl}/api/foods/${mealId}`, {
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
        .then((meal: MealInfo) => {
            if (meal) {
                console.log("meal: ", meal);
                return meal;
            } else {
                throw new Error("No meal info received");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyData[0];
        });
}
