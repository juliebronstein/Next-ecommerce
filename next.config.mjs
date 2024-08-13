/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
       remotePatterns:[{hostname:"images.unsplash.com"}],
       unoptimized: true
    },
    experimental:{
        serverActions:true
    }
  
};

export default nextConfig;
