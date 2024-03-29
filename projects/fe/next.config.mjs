/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/workout/todos",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
