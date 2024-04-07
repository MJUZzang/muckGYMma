/** @type {import('next').NextConfig} */
const nextConfig = {
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
