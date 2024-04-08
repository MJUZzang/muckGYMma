import React from "react";
import LogoAndTitle from "@/_components/LogoAndTitle";
import Settings from "@/profile/_images/Settings";
import Image from "next/image";
import exampleImage from "@/_images/pooh.jpg";

const Page = () => {
    return (
        <>
            <div className="flex items-center justify-between border-b-[1px] border-b-gray-800">
                <div className="flex items-center">
                    <LogoAndTitle />
                </div>
                <Settings className="mr-3 relative top-1" />
            </div>

            <div className="max-w-[935px] mx-auto">
                <div className="flex gap-5 mx-4 mt-3">
                    <Image
                        src={exampleImage}
                        alt="avatar"
                        className="w-[68px] h-[68px] rounded-full"
                    />

                    <div className="flex flex-col text-white gap-3">
                        <p className="text-xl">jeheecheon</p>

                        <div className="flex gap-4">
                            <div className="px-4 py-1 bg-[#363636] rounded-md">
                                Edit profile
                            </div>
                            <div className="px-4 py-1 bg-[#363636] rounded-md">
                                View archive
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-4 mt-5">
                    <p className="text-white">jeheecheon</p>
                    <p className="text-white">🇰🇷</p>
                    <p className="text-white">🔗 www.jeheecheon.com</p>
                </div>

                <div className="grid grid-cols-3 gap-1 md:gap-3">
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                    <div className="aspect-square overflow-clip">
                        <Image src={exampleImage} alt="avatar" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
