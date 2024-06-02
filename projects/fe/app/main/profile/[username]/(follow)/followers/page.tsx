import React from "react";
import { fetchFollowers } from "@/main/profile/[username]/(follow)/_utils/follow";
import Image from "next/image";
import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

interface FollowersPageProps {
    params: { username: string };
}

async function FollowersPage({ params }: FollowersPageProps) {
    const { username } = params;
    const followers = await fetchFollowers(username);
    console.log(followers);

    return (
        <div className={`space-y-2 px-3 pt-2 ${notoSansKr.className}`}>
            {followers.map((follower, index) => {
                return (
                    <div key={index} className="flex items-center space-x-2">
                        {/* Avatar Image */}
                        <div className="w-[45px] h-[45px]">
                            <div className="w-[45px] h-[45px] overflow-clip rounded-full">
                                <Image
                                    src={follower.profileImageUrl}
                                    alt="User avatar"
                                    className="w-[45px] h-[45px] pointer-events-none"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <p className="text-app-font-2">
                                {follower.nickname}
                            </p>
                            <p className="text-xs text-app-font-4">
                                {follower.email}
                            </p>
                        </div>

                        <button className="text-nowrap text-sm rounded-lg px-3 py-1 border-2">삭제</button>
                    </div>
                );
            })}
        </div>
    );
}

export default FollowersPage;
