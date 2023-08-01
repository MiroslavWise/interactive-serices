const env: IEnv = {
  server: {
    host: process.env.NEXT_PUBLIC_URL!,
    port: Number(process.env.PORT!),
  },
  auto_verification: Boolean(process.env.NEXT_PUBLIC_AUTO_VERIFICATION),
  authProvider: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
    google: {
      GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    },
    apple: {
      APPLE_ID: process.env.NEXT_PUBLIC_APPLE_ID!,
      APPLE_SECRET: process.env.NEXT_PUBLIC_APPLE_SECRET!,
    },
    vk: {
      VK_CLIENT_ID: process.env.NEXT_PUBLIC_VK_CLIENT_ID!,
      VK_CLIENT_SECRET: process.env.NEXT_PUBLIC_VK_CLIENT_SECRET!,
    },
    yandex: {
      YANDEX_CLIENT_ID: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID!,
      YANDEX_CLIENT_SECRET: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET!,
    },
  },
}

export default env

interface IEnv {
  server: {
    host: string
    port: number
  }
  auto_verification: boolean
  authProvider: {
    NEXTAUTH_SECRET: string
    google: {
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
    }
    apple: {
      APPLE_ID: string
      APPLE_SECRET: string
    }
    vk: {
      VK_CLIENT_ID: string
      VK_CLIENT_SECRET: string
    }
    yandex: {
      YANDEX_CLIENT_ID: string
      YANDEX_CLIENT_SECRET: string
    }
  }
}