import type { DefaultSession } from "next-auth"
import type { IUserRole } from "@/types"
declare module "next-auth" {
    interface Session {
        user: {
            role: IUserRole
        } & DefaultSession["user"]
    }
}