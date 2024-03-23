import { StaticImageData } from "next/image"

export default interface UserInfo {
    name: string;
    avatar: StaticImageData;
}