import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
const isProd = process.env.NODE_ENV === 'production';
const internalHost = process.env.TAURI_DEV_HOST || '127.0.0.1';
const withSerwist = withSerwistInit({
	reloadOnOnline: true,
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js", 
	cacheOnNavigation: true
});
const nextConfig: NextConfig = {
	allowedDevOrigins: undefined,
	images: {
		unoptimized: true,
		remotePatterns: [{ protocol: "https", hostname: "*" }],
	},
	output: "export",
	assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
}
export default withSerwist(nextConfig);
