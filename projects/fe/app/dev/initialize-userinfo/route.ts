import { backendUrl } from "@/_utils/urls";
import { NextResponse, type NextRequest } from "next/server";
import { userInfoState } from "../../../lib/slices/userInfoSlice";

export const dynamic = "force-dynamic"; // defaults to auto

const dummyUserInfo: userInfoState = {
    nickname: "JoneDoe",
    exercises: ["스쿼트", "데드리프트", "벤치프레스"],
    exerciseSetting: {
        experience: "3개월 미만",
        frequency: "주 3회",
        goal: "근비대",
        level: "입문자",
    },
    physicalSetting: {
        birth: "1996-01-01",
        gender: "남성",
        height: 180,
        weight: 70,
    },
    sports: ["축구"],
};

export async function GET(request: NextRequest) {
    if (process.env.NODE_ENV === "development") {
        return await fetch(`${backendUrl}/api/member/setup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Cookie: request.cookies
                    .getAll()
                    .map((cookie) => {
                        return `${cookie.name}=${cookie.value}`;
                    })
                    .join("; "),
            },
            body: JSON.stringify(dummyUserInfo),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to set up");
                } else {
                    console.log("Successfully set up");
                    return NextResponse.redirect(
                        new URL("/main/workout", request.url)
                    );
                }
            })
            .catch((err) => {
                console.error(err);
                return NextResponse.error();
            });
    } else {
        return NextResponse.redirect(new URL("/main/workout", request.url));
    }
}
