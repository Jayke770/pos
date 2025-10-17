import NextAuth from "next-auth";
import { AuthOptions } from "@/services/next-auth/auth";

const nextAuth = NextAuth(AuthOptions);
export { nextAuth as GET, nextAuth as POST };
