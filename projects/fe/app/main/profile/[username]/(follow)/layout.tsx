import ArrowBack from "@/_images/ArrowBack";
import { Noto_Sans_KR } from "next/font/google";
import React from "react";
import {
    fetchFollowers,
    fetchFollowing,
} from "@/main/profile/[username]/(follow)/_utils/follow";
import NavMenu from "./_components/NavMenu";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

interface FollowLayoutProps {
    children: React.ReactNode;
    params: { username: string };
}

async function FollowLayout({ children, params }: FollowLayoutProps) {
    const { username } = params;
    const followers = await fetchFollowers(username);
    const following = await fetchFollowing(username);

    return (
        <div
            className={`absolute top-0 w-full h-[100dvh] bg-app-bg ${notoSansKr.className}`}
        >
            <div className="grid grid-cols-3 px-2 py-2">
                <ArrowBack className="fill-app-font-2" />
                <p className="w-full text-center text-lg">{username}</p>
                <div />
            </div>

            <NavMenu
                username={username}
                followersCount={followers.length}
                followingCount={following.length}
            />

            <div className="pb-[90px]">{children}</div>
        </div>
    );
}

export default FollowLayout;
