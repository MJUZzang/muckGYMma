import React from "react";
import { fetchFollowers } from "../_utils/follow";

interface FollowersPageProps {
    params: { username: string };
}

async function FollowersPage({ params }: FollowersPageProps) {
    const { username } = params;
    const followers = await fetchFollowers(username);
    console.log(followers);
    return <div>FollowersPage</div>;
}

export default FollowersPage;
