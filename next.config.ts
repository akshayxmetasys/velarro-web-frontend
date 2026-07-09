import type { NextConfig } from "next";
import { getSecurityHeaders } from "./lib/security/headers";

const nextConfig: NextConfig = {
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
