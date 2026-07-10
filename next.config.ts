import type { NextConfig } from "next";
import { APPROVED_IMAGE_HOST } from "./lib/assets/approved-image-hosts";
import { getSecurityHeaders } from "./lib/security/headers";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: APPROVED_IMAGE_HOST,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: getSecurityHeaders({
          environment: process.env.NODE_ENV,
          enableStrictTransportSecurity:
            process.env.VELARRO_ENABLE_HSTS === "true",
        }),
      },
    ];
  },
};

export default nextConfig;
