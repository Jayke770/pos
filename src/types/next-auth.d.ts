import type { DefaultSession } from "next-auth"
import type { IUserRole } from "@/types"
declare module "next-auth" {
    interface Session {
        user: {
            id?: string,
            role: IUserRole
        } & DefaultSession["user"]
    }
}