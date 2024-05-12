/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
});

export default withPWA({
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "muckgymma.s3.ap-northeast-2.amazonaws.com",
                port: "",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/workout",
                permanent: true,
            },
            // {
            //     source: "/api/:path*",
            //     destination: "https://localhost:8080/api/:path*",
            //     permanent: false,
            // }
        ];
    },
});
