/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'm.media-amazon.com',
      'ia.media-imdb.com',
      'image.tmdb.org'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: '**.imdb.com',
      }
    ]
  },
}

module.exports = nextConfig
