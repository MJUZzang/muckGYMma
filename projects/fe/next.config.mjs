/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["muckgymma.s3.ap-northeast-2.amazonaws.com"],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/workout/todo",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
