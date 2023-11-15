/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/create',
                destination: '/',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
