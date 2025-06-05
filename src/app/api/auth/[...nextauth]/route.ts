import { AuthOptions } from "@/services/next-auth/auth"
import NextAuth from "next-auth"
const nextAuth = NextAuth(AuthOptions)
export { nextAuth as GET, nextAuth as POST }