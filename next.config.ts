import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zzz-pet.oss-cn-hangzhou.aliyuncs.com",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
