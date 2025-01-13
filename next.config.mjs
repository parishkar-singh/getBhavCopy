/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Disable ESLint checks during the build process
    },
    output: 'export',
}

export default nextConfig;
