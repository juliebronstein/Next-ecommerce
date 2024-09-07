/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
       remotePatterns:[
        {hostname:"images.unsplash.com"},
        {hostname:"https://lh3.googleusercontent.com/a"}
    ],
       unoptimized: true
    },
    experimental:{
        serverActions:true
    }
  
};

export default nextConfig;
