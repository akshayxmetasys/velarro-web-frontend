import type { NextConfig } from "next";
import { getSecurityHeaders } from "./lib/security/headers";

// Keep in sync with APPROVED_IMAGE_HOST in lib/assets/approved-image-hosts.ts.
// Inlined here so Next.js config loading does not depend on TS path resolution in dev.
const APPROVED_IMAGE_HOST = "lpnrhpvmrnoqkzoxukov.supabase.co";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: APPROVED_IMAGE_HOST,
        port: "",
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
