const env: IEnv = {
  server: {
    host: process.env.NEXT_PUBLIC_URL!,
    port: Number(process.env.PORT!),
  },
  auto_verification: Boolean(process.env.NEXT_PUBLIC_AUTO_VERIFICATION),
}

export default env

interface IEnv {
  server: {
    host: string
    port: number
  }
  auto_verification: boolean
}