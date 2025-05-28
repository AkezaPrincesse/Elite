// next.config.js
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8095/api/:path*' // Match your Spring Boot port
            },
            {
                source: '/auth/:path*',
                destination: 'http://localhost:8095/api/auth/:path*'
            }
        ]
    },
    images: {
        domains: ['localhost'], // If you're using images
    },
}