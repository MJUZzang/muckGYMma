import { backendUrl } from "@/_utils/urls";
import { cookies } from "next/headers";
import { FollowerInfo, FollowingInfo } from "../_types/follow";

export const dummyFollowers: FollowerInfo[] = [
    {
        nickname: "test",
        email: "jeheecheon@gmail.com",
        profileImageUrl:
            "https://lh3.googleusercontent.com/a/ACg8ocIOWmHdc4ui5vWFDdcszL0AObeD-DiwbtAFEkVFSAyuZtKaodm6=s96-c",
    },
];
export const dummyFollowing: FollowingInfo[] = [
    {
        nickname: "test",
        email: "jeheecheon@gmail.com",
        profileImageUrl:
            "https://lh3.googleusercontent.com/a/ACg8ocIOWmHdc4ui5vWFDdcszL0AObeD-DiwbtAFEkVFSAyuZtKaodm6=s96-c",
    },
];

export async function fetchFollowers(username: string) {
    const cookieStore = cookies();
    return await fetch(
        `${backendUrl}/api/follow/followers?nickname=${username}`,
        {
            method: "GET",
            cache: "force-cache",
            headers: {
                Cookie: cookieStore
                    .getAll()
                    .map((cookie) => {
                        return `${cookie.name}=${cookie.value}`;
                    })
                    .join("; "),
            },
            credentials: "include",
        }
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Failed to fetch followers");
            }
        })
        .then((followers: FollowerInfo[]) => {
            if (followers) {
                return followers;
            } else {
                throw new Error("Failed to fetch followers");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyFollowers;
        });
}

export async function fetchFollowing(username: string) {
    const cookieStore = cookies();
    return await fetch(
        `${backendUrl}/api/follow/following?nickname=${username}`,
        {
            method: "GET",
            headers: {
                Cookie: cookieStore
                    .getAll()
                    .map((cookie) => {
                        return `${cookie.name}=${cookie.value}`;
                    })
                    .join("; "),
            },
            credentials: "include",
        }
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Failed to fetch following");
            }
        })
        .then((following: FollowingInfo[]) => {
            if (following) {
                return following;
            } else {
                throw new Error("Failed to fetch following");
            }
        })
        .catch((err) => {
            console.error(err);
            return dummyFollowers;
        });
}