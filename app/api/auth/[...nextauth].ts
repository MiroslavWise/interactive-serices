import NextAuth, { type NextAuthOptions } from "next-auth"

import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";
import YandexProvider from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials"

import { URL } from "services/url";

export const authOptions: NextAuthOptions = {
        providers: [
                AppleProvider({
                        clientId: process.env.APPLE_ID!,
                        clientSecret: process.env.APPLE_SECRET!,
                }),
                GoogleProvider({
                        clientId: process.env.GOOGLE_CLIENT_ID!,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                }),
                VkProvider({
                        clientId: process.env.VK_CLIENT_ID!,
                        clientSecret: process.env.VK_CLIENT_SECRET!,
                }),
                YandexProvider({
                        clientId: process.env.YANDEX_CLIENT_ID!,
                        clientSecret: process.env.YANDEX_CLIENT_SECRET!,
                }),
                CredentialsProvider({
                        name: 'Credentials',
                        type: 'credentials',
                        credentials: {
                                
                        },
                        async authorize(credentials, req) {
                                const res = await fetch('/', {
                                        method: 'POST',
                                        body: JSON.stringify(credentials),
                                        headers: { "Content-Type": "application/json" },
                                })
                                const user = await res.json()
                                if (res.ok && user) {
                                        return user
                                }
                                return null
                        },
                }),
        ],
        // callbacks: {
        //         session({ session, token, user }) {
        //                 return session
        //         },
        //         async signIn({ credentials, user, }) {
        //                 const data = {
        //                         email: credentials?.email?.value,
        //                         password: credentials?.password?.value
        //                 }
        //                 console.log("data: ", data)
        //                 // const res = await fetch(`${URL}auth/login`, {
        //                 //         method: 'POST',
        //                 //         body: JSON.stringify(data),
        //                 //         headers: {
        //                 //                 "Content-Type": "application/json",
        //                 //         },
        //                 // })
        //                 // return res.json()
        //                 return Promise.resolve('1')
        //         }
        // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }