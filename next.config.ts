import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	allowedDevOrigins: ["127.0.0.1"],
	devIndicators: false,
	images: {
		remotePatterns: [{ protocol: "https", hostname: "*" }],
	}
};

export default nextConfig;
