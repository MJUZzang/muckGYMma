import React from "react";
import { fetchFollowers } from "@/main/profile/[username]/(follow)/_utils/follow";
import FollowerList from "@/main/profile/[username]/(follow)/_components/FollowerList";

interface FollowersPageProps {
    params: { username: string };
}

async function FollowersPage({ params }: FollowersPageProps) {
    const { username } = params;
    const followers = await fetchFollowers(username);

    return <FollowerList followers={followers} />;
}

export default FollowersPage;
