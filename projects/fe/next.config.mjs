/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/feed',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
