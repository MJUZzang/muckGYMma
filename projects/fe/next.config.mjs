/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "muckgymma.s3.ap-northeast-2.amazonaws.com",
                port: '',
            }
        ]
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
