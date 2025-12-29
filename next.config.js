/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Ensure we don't leak server-side env vars to the client
    env: {
        // Client-side env vars go here if needed
    },
}

module.exports = nextConfig
