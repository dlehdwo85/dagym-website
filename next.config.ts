import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
  },
  poweredByHeader: false,
  async redirects() {
    // 운영 사례 상세는 /project/[slug] 로 제공
    return [{ source: "/projects/:slug", destination: "/project/:slug", permanent: true }];
  },
};

export default nextConfig;
