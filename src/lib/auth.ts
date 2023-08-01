import type { NextAuthOptions } from "next-auth"
import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"
import VkProvider from "next-auth/providers/vk"
import YandexProvider from "next-auth/providers/yandex"

import env from "@/config/environment"

export const authOptions: NextAuthOptions = {
  secret: env.authProvider.NEXTAUTH_SECRET,
  providers: [
    AppleProvider({
      clientId: env.authProvider.apple.APPLE_ID,
      clientSecret: env.authProvider.apple.APPLE_SECRET,
    }),
    GoogleProvider({
      clientId: env.authProvider.google.GOOGLE_CLIENT_ID,
      clientSecret: env.authProvider.google.GOOGLE_CLIENT_SECRET
    }),
    VkProvider({
      clientId: env.authProvider.vk.VK_CLIENT_ID,
      clientSecret: env.authProvider.vk.VK_CLIENT_SECRET,
    }),
    YandexProvider({
      clientId: env.authProvider.yandex.YANDEX_CLIENT_ID,
      clientSecret:  env.authProvider.yandex.YANDEX_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: "jwt",

  },
}