import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
const withSerwist = withSerwistInit({
	reloadOnOnline: true,
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js", 
	cacheOnNavigation: true
});
const nextConfig: NextConfig = {
	allowedDevOrigins: ["192.168.1.13", "localhost", "127.0.0.1"],
	images: {
		unoptimized: true,
		remotePatterns: [{ protocol: "https", hostname: "*" }],
	},
	output: "export"
}
export default withSerwist(nextConfig);
