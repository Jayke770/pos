import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { AuthJsMongodbAdapter } from "@/services/next-auth/mongodb-adapter"
import { appConfig } from "@/lib/config"
export const AuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: appConfig.appName,
            credentials: {
                username: {},
                password: {}
            },
            async authorize(credentials, req) {
                if (credentials?.username === process.env.ADMIN_USERNAME && credentials?.password === process.env.ADMIN_PASSWORD) {
                    return {
                        id: "admin",
                        email: null,
                        image: null,
                        role: "admin"
                    }
                }
                return null
            },
        })
    ],
    adapter: MongoDBAdapter(AuthJsMongodbAdapter),
    session: { strategy: "jwt" },
    callbacks: {
        jwt({ token, user }) {
            //@ts-ignore
            if (user) token.role = user?.role as any
            return token
        },
        session({ session, token }) {
            session.user.role = token.role
            return session
        }
    },
    pages: {
        signIn: "/",
        signOut: "/"
    }
}