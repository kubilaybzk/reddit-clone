/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['avatars.dicebear.com','dummyimage.com']
  }
}

module.exports = nextConfig
