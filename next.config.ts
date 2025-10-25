import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
	reloadOnOnline: true,
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js",
});
const nextConfig: NextConfig = {
	images: {
		unoptimized: true,
		remotePatterns: [{ protocol: "https", hostname: "*" }],
	},
	output: "export"
}
export default withSerwist(nextConfig);
