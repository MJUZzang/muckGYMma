import React from "react";
import { fetchFollowing } from "@/main/profile/[username]/(follow)/_utils/follow";
import { Noto_Sans_KR } from "next/font/google";
import FollowingList from "../_components/FollowingList";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

interface FollowersPageProps {
    params: { username: string };
}

async function FollowingPage({ params }: FollowersPageProps) {
    const { username } = params;
    const followings = await fetchFollowing(username);
    console.log(followings);

    return <FollowingList followings={followings} />;
}

export default FollowingPage;
